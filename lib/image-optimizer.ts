import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, isFirebaseConfigured } from "./firebase";
import { createDoc } from "./firebase-service";

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
  format?: "image/webp" | "image/jpeg" | "image/png";
}

export interface OptimizedImageResult {
  blob: Blob;
  width: number;
  height: number;
  originalSize: number;
  compressedSize: number;
  compressionRatio: string;
  format: string;
}

export interface UploadMediaResult {
  downloadUrl: string;
  storagePath: string;
  mediaId: string;
  width: number;
  height: number;
  sizeBytes: number;
  format: string;
}

/**
 * Client-side image compression & WebP conversion via HTML5 Canvas
 */
export async function compressImage(
  file: File | Blob,
  options: CompressionOptions = {}
): Promise<OptimizedImageResult> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.82,
    format = "image/webp",
  } = options;

  const originalSize = file.size;

  // If already an SVG or PDF, do not resize via Canvas
  if ("type" in file && (file.type === "image/svg+xml" || file.type === "application/pdf")) {
    return {
      blob: file,
      width: 0,
      height: 0,
      originalSize,
      compressedSize: originalSize,
      compressionRatio: "1.00",
      format: file.type,
    };
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let { width, height } = img;

        // Calculate aspect ratio preserving dimensions
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Unable to obtain 2D canvas context"));
          return;
        }

        // Apply smooth bilinear scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP or requested format
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas toBlob conversion failed"));
              return;
            }

            const compressedSize = blob.size;
            const ratio = ((compressedSize / originalSize) * 100).toFixed(1) + "%";

            resolve({
              blob,
              width,
              height,
              originalSize,
              compressedSize,
              compressionRatio: ratio,
              format,
            });
          },
          format,
          quality
        );
      };

      img.onerror = () => reject(new Error("Failed to load image for processing"));
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}

/**
 * Compress and upload media to Firebase Storage and index it in Firestore /media
 */
export async function uploadOptimizedMedia(
  file: File,
  folder: "hero" | "partners" | "products" | "services" | "media" | "profiles" | string = "media",
  compressionOptions?: CompressionOptions,
  uploaderEmail?: string
): Promise<{ success: boolean; result?: UploadMediaResult; error?: string }> {
  if (!isFirebaseConfigured() || !storage) {
    return {
      success: false,
      error: "Firebase Storage is not configured. Please check your .env.local file.",
    };
  }

  try {
    // 1. Client-side compression
    const optimized = await compressImage(file, compressionOptions);

    // 2. Generate clean storage filename
    const timestamp = Date.now();
    const cleanFileName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .replace(/\.[^/.]+$/, "");
    
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const isSvg = file.type === "image/svg+xml" || optimized.format === "image/svg+xml";
    const ext = isPdf ? ".pdf" : isSvg ? ".svg" : optimized.format === "image/webp" ? ".webp" : ".jpg";
    const storagePath = `${folder}/${timestamp}_${cleanFileName}${ext}`;

    // 3. Upload bytes to Firebase Storage
    const storageRef = ref(storage, storagePath);
    const contentType = isPdf ? "application/pdf" : optimized.format;
    const metadata = {
      contentType,
      cacheControl: "public, max-age=31536000, immutable", // 1 year CDN cache header
      customMetadata: {
        originalName: file.name,
        compressed: isPdf ? "false" : "true",
        width: String(optimized.width),
        height: String(optimized.height),
      },
    };

    const snapshot = await uploadBytes(storageRef, optimized.blob, metadata);
    const downloadUrl = await getDownloadURL(snapshot.ref);

    // 4. Index media record in Firestore /media collection for registry search
    const mediaDocRes = await createDoc(
      "media",
      {
        fileName: `${cleanFileName}${ext}`,
        storagePath,
        downloadUrl,
        folder,
        mimeType: contentType,
        width: optimized.width,
        height: optimized.height,
        sizeBytes: optimized.compressedSize,
        originalSizeBytes: optimized.originalSize,
        status: "published",
        order: 0,
      },
      undefined,
      uploaderEmail
    );

    return {
      success: true,
      result: {
        downloadUrl,
        storagePath,
        mediaId: mediaDocRes.id,
        width: optimized.width,
        height: optimized.height,
        sizeBytes: optimized.compressedSize,
        format: contentType,
      },
    };
  } catch (err: any) {
    console.error("Failed to compress and upload media:", err);
    return { success: false, error: err?.message || "Upload failed" };
  }
}

/**
 * Dedicated PDF document upload helper.
 * Attempts Firebase Storage upload first; if offline or fails, falls back to server API route /api/admin/upload-pdf
 */
export async function uploadPdfDocument(
  file: File,
  folder: string = "profiles",
  uploaderEmail?: string
): Promise<{
  success: boolean;
  downloadUrl?: string;
  storagePath?: string;
  filename?: string;
  sizeBytes?: number;
  sizeFormatted?: string;
  error?: string;
}> {
  // Validate that the file is a PDF
  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) {
    return {
      success: false,
      error: "Only PDF documents (.pdf) are allowed.",
    };
  }

  const sizeBytes = file.size;
  const sizeFormatted = sizeBytes >= 1048576
    ? `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`
    : `${(sizeBytes / 1024).toFixed(0)} KB`;

  // 1. Try Firebase Storage if configured
  if (isFirebaseConfigured() && storage) {
    try {
      const timestamp = Date.now();
      const cleanFileName = file.name
        .replace(/[^a-zA-Z0-9.-]/g, "_")
        .replace(/\.pdf$/i, "");
      const storagePath = `${folder}/${timestamp}_${cleanFileName}.pdf`;
      const storageRef = ref(storage, storagePath);

      const metadata = {
        contentType: "application/pdf",
        cacheControl: "public, max-age=31536000",
        customMetadata: {
          originalName: file.name,
          uploadedBy: uploaderEmail || "admin",
        },
      };

      const snapshot = await uploadBytes(storageRef, file, metadata);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      // Index in Firestore /media if possible
      try {
        await createDoc(
          "media",
          {
            fileName: `${cleanFileName}.pdf`,
            storagePath,
            downloadUrl,
            folder,
            mimeType: "application/pdf",
            width: 0,
            height: 0,
            sizeBytes,
            originalSizeBytes: sizeBytes,
            status: "published",
            order: 0,
          },
          undefined,
          uploaderEmail
        );
      } catch (docErr) {
        console.warn("Could not index PDF media doc (non-fatal):", docErr);
      }

      return {
        success: true,
        downloadUrl,
        storagePath,
        filename: file.name,
        sizeBytes,
        sizeFormatted,
      };
    } catch (fbErr: any) {
      console.warn("Firebase Storage upload failed, attempting local server fallback:", fbErr);
    }
  }

  // 2. Fallback to Next.js API route (/api/admin/upload-pdf)
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload-pdf", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Server upload failed");
    }

    return {
      success: true,
      downloadUrl: data.downloadUrl,
      filename: data.filename || file.name,
      sizeBytes,
      sizeFormatted: data.sizeFormatted || sizeFormatted,
    };
  } catch (apiErr: any) {
    console.error("Local PDF upload fallback failed:", apiErr);
    return {
      success: false,
      error: apiErr?.message || "Failed to upload PDF via both Firebase Storage and local server.",
    };
  }
}
