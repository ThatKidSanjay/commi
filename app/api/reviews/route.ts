
import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export const runtime = "nodejs";

const MAX_IMAGES = 3;

function isValidImageUrl(url: unknown): url is string {
  if (typeof url !== "string" || url.length > 2048) {
    return false;
  }

  try {
    const parsed = new URL(url);

    return (
      parsed.protocol === "https:" &&
      parsed.hostname.endsWith(
        ".public.blob.vercel-storage.com",
      ) &&
      parsed.hostname.length >
        ".public.blob.vercel-storage.com".length &&
      parsed.username === "" &&
      parsed.password === ""
    );
  } catch {
    return false;
  }
}

// GET: Return approved public reviews.
export async function GET() {
  try {
    const result = await pool.query(
      `SELECT
         id::text AS id,
         name,
         project,
         rating,
         message,
         image_urls AS "imageUrls",
         created_at AS "createdAt"
       FROM reviews
       WHERE approved = TRUE
       ORDER BY created_at DESC`,
    );

    return NextResponse.json({
      reviews: result.rows,
    });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);

    return NextResponse.json(
      { error: "Unable to load reviews." },
      { status: 500 },
    );
  }
}

// POST: Submit a review for moderation.
export async function POST(request: NextRequest) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 },
      );
    }

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 },
      );
    }

    const data = body as Record<string, unknown>;

    const name =
      typeof data.name === "string"
        ? data.name.trim()
        : "";

    const project =
      typeof data.project === "string"
        ? data.project.trim()
        : "";

    const message =
      typeof data.message === "string"
        ? data.message.trim()
        : "";

    const rating = data.rating;

    if (
      name.length < 2 ||
      name.length > 60 ||
      project.length < 1 ||
      project.length > 100 ||
      message.length < 5 ||
      message.length > 1000 ||
      typeof rating !== "number" ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json(
        {
          error:
            "Please provide a valid name, project, rating, and review message.",
        },
        { status: 400 },
      );
    }

    // Validate optional image URLs.
    const rawImageUrls = data.imageUrls;

    if (
      rawImageUrls !== undefined &&
      (
        !Array.isArray(rawImageUrls) ||
        rawImageUrls.length > MAX_IMAGES ||
        !rawImageUrls.every(isValidImageUrl) ||
        new Set(rawImageUrls).size !== rawImageUrls.length
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid review images. You can submit up to 3 unique images.",
        },
        { status: 400 },
      );
    }

    const imageUrls: string[] =
      rawImageUrls === undefined
        ? []
        : (rawImageUrls as string[]);

    const result = await pool.query(
      `INSERT INTO reviews
         (name, project, rating, message, image_urls)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING
         id::text AS id,
         name,
         project,
         rating,
         message,
         image_urls AS "imageUrls",
         created_at AS "createdAt"`,
      [name, project, rating, message, imageUrls],
    );

    return NextResponse.json(
      {
        message:
          "Review submitted successfully and is awaiting approval.",
        review: result.rows[0],
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to submit review:", error);

    return NextResponse.json(
      {
        error:
          "Unable to submit your review. Please try again.",
      },
      { status: 500 },
    );
  }
}
