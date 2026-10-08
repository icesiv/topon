import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided." },
        { status: 400 }
      );
    }

    // Validate that it's an image
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
      "image/avif",
    ];

    const isImage =
      validTypes.includes(file.type) ||
      /\.(jpg|jpeg|png|webp|gif|svg|avif)$/i.test(file.name);

    if (!isImage) {
      return NextResponse.json(
        {
          success: false,
          error: "Only image files (JPG, PNG, WebP, GIF, SVG, AVIF) are supported.",
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract extension safely
    const extMatch = file.name.match(/\.([a-zA-Z0-9]+)$/);
    const ext = extMatch ? `.${extMatch[1].toLowerCase()}` : ".jpg";

    // Clean name without extension
    const rawCleanName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();

    const uniqueFilename = `${Date.now()}_${rawCleanName}${ext}`;

    // Target directory: public/images/artical-img
    const uploadDir = path.join(process.cwd(), "public", "images", "artical-img");
    await mkdir(uploadDir, { recursive: true });

    const targetFilePath = path.join(uploadDir, uniqueFilename);
    await writeFile(targetFilePath, buffer);

    const sizeBytes = buffer.length;
    const sizeFormatted =
      sizeBytes >= 1048576
        ? `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`
        : `${(sizeBytes / 1024).toFixed(0)} KB`;

    const publicUrl = `/images/artical-img/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueFilename,
      sizeBytes,
      sizeFormatted,
    });
  } catch (error: any) {
    console.error("Article image upload API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal server error uploading article image.",
      },
      { status: 500 }
    );
  }
}
