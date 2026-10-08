import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file was provided in the upload request." },
        { status: 400 }
      );
    }

    // Validate that the file is a PDF
    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return NextResponse.json(
        { success: false, error: "Only PDF documents (.pdf) are supported." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitize file name
    const rawCleanName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .replace(/\.pdf$/i, "");
    const uniqueFilename = `${Date.now()}_${rawCleanName}.pdf`;

    const uploadDir = path.join(process.cwd(), "public", "profiles");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, uniqueFilename), buffer);

    const sizeBytes = buffer.length;
    const sizeFormatted =
      sizeBytes >= 1048576
        ? `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`
        : `${(sizeBytes / 1024).toFixed(0)} KB`;

    return NextResponse.json({
      success: true,
      downloadUrl: `/profiles/${uniqueFilename}`,
      filename: file.name,
      sizeBytes,
      sizeFormatted,
    });
  } catch (error: any) {
    console.error("PDF upload API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal server error uploading PDF document.",
      },
      { status: 500 }
    );
  }
}
