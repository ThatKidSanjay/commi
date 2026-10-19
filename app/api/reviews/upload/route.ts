
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

function hasValidSignature(
  bytes: Uint8Array,
  contentType: string,
): boolean {
  if (contentType === "image/jpeg") {
    return (
      bytes[0] === 0xff &&
      bytes[1] === 0xd8 &&
      bytes[2] === 0xff
    );
  }

  if (contentType === "image/png") {
    return (
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a
    );
  }

  if (contentType === "image/webp") {
    return (
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    );
  }

  return false;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN is missing.");
      return NextResponse.json(
        { error: "Image uploads are not configured." },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const files = formData.getAll("file");

    if (files.length === 0 || files.some((item) => !(item instanceof File))) {
      return NextResponse.json(
        { error: "Please select at least one image." },
        { status: 400 },
      );
    }

    if (files.length > 3) {
      return NextResponse.json(
        { error: "You can upload a maximum of 3 images per request." },
        { status: 400 },
      );
    }

    const uploadedUrls: string[] = [];

    for (const item of files) {
      const file = item as File;

      if (!(ALLOWED_TYPES as readonly string[]).includes(file.type)) {
        return NextResponse.json(
          { error: "Only JPEG, PNG, and WebP images are allowed." },
          { status: 400 },
        );
      }

      if (file.size === 0 || file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "Each image must be smaller than 4 MB." },
          { status: 400 },
        );
      }

      const signature = new Uint8Array(
        await file.slice(0, 12).arrayBuffer(),
      );

      if (!hasValidSignature(signature, file.type)) {
        return NextResponse.json(
          { error: "An uploaded file is not a valid image." },
          { status: 400 },
        );
      }

      const extension =
        file.type === "image/jpeg"
          ? "jpg"
          : file.type === "image/png"
            ? "png"
            : "webp";

      const blob = await put(
        `reviews/${randomUUID()}.${extension}`,
        file,
        {
          access: "public",
          addRandomSuffix: false,
          contentType: file.type,
        },
      );

      uploadedUrls.push(blob.url);
    }

    return NextResponse.json(
      { urls: uploadedUrls },
      { status: 201 },
    );
  } catch (error) {
    console.error("Review image upload failed:", error);

    return NextResponse.json(
      { error: "Image upload failed. Please try again." },
      { status: 500 },
    );
  }
}
