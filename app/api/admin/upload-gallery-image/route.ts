import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const rawSlug = (formData.get("slug") as string | null) || "general";

    // Clean and sanitize slug for directory naming
    const sanitizedSlug = rawSlug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "general";

    // Gather all files passed in formData ("files" or "file")
    const files: File[] = [];
    const directFiles = formData.getAll("files") as File[];
    const singleFiles = formData.getAll("file") as File[];

    for (const f of [...directFiles, ...singleFiles]) {
      if (f && typeof f === "object" && "name" in f && f.size > 0) {
        files.push(f);
      }
    }

    if (files.length === 0) {
      return NextResponse.json(
        { success: false, error: "No image file provided for upload." },
        { status: 400 }
      );
    }

    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
      "image/avif",
    ];

    // Target folder: public/images/gallary/[slug]
    const uploadDir = path.join(process.cwd(), "public", "images", "gallary", sanitizedSlug);
    await mkdir(uploadDir, { recursive: true });

    const uploadedUrls: string[] = [];
    const uploadedDetails: Array<{ url: string; filename: string; sizeBytes: number }> = [];

    for (const file of files) {
      const isImage =
        validTypes.includes(file.type) ||
        /\.(jpg|jpeg|png|webp|gif|svg|avif)$/i.test(file.name);

      if (!isImage) {
        continue;
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Safe extension
      const extMatch = file.name.match(/\.([a-zA-Z0-9]+)$/);
      const ext = extMatch ? `.${extMatch[1].toLowerCase()}` : ".jpg";

      // Safe clean filename
      const rawCleanName = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .toLowerCase();

      const uniqueFilename = `${Date.now()}_${Math.random().toString(36).slice(2, 6)}_${rawCleanName}${ext}`;
      const targetFilePath = path.join(uploadDir, uniqueFilename);

      await writeFile(targetFilePath, buffer);

      const publicUrl = `/images/gallary/${sanitizedSlug}/${uniqueFilename}`;
      uploadedUrls.push(publicUrl);
      uploadedDetails.push({
        url: publicUrl,
        filename: uniqueFilename,
        sizeBytes: buffer.length,
      });
    }

    if (uploadedUrls.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "None of the uploaded files were valid image formats (JPG, PNG, WebP, GIF, SVG, AVIF).",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      slug: sanitizedSlug,
      url: uploadedUrls[0],
      urls: uploadedUrls,
      count: uploadedUrls.length,
      files: uploadedDetails,
    });
  } catch (error: any) {
    console.error("Gallery image upload API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal server error uploading gallery image.",
      },
      { status: 500 }
    );
  }
}
