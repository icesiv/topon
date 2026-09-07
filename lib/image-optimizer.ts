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
  folder: "hero" | "partners" | "products" | "services" | "media" = "media",
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
    const ext = optimized.format === "image/webp" ? ".webp" : ".jpg";
    const storagePath = `${folder}/${timestamp}_${cleanFileName}${ext}`;

    // 3. Upload bytes to Firebase Storage
    const storageRef = ref(storage, storagePath);
    const metadata = {
      contentType: optimized.format,
      cacheControl: "public, max-age=31536000, immutable", // 1 year CDN cache header
      customMetadata: {
        originalName: file.name,
        compressed: "true",
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
        mimeType: optimized.format,
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
        format: optimized.format,
      },
    };
  } catch (err: any) {
    console.error("Failed to compress and upload media:", err);
    return { success: false, error: err?.message || "Upload failed" };
  }
}
