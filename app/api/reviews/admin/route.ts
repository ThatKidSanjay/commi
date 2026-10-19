
import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { isReviewAdmin } from "@/lib/review-admin";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isReviewAdmin())) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 },
    );
  }

  try {
    const result = await pool.query(`
      SELECT
        id::text AS id,
        name,
        project,
        rating,
        message,
        image_urls AS "imageUrls",
        approved,
        created_at AS "createdAt"
      FROM public.reviews
      ORDER BY created_at DESC
    `);

    return NextResponse.json({
      reviews: result.rows,
    });
  } catch (error) {
    console.error("Admin reviews GET error:", error);

    return NextResponse.json(
      { error: "Unable to load reviews." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isReviewAdmin())) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();

    if (
      typeof body.id !== "string" ||
      !/^\d+$/.test(body.id) ||
      typeof body.approved !== "boolean"
    ) {
      return NextResponse.json(
        { error: "Invalid review ID or approval status." },
        { status: 400 },
      );
    }

    const result = await pool.query(
      `
        UPDATE public.reviews
        SET approved = $2
        WHERE id = $1
        RETURNING
          id::text AS id,
          name,
          project,
          rating,
          message,
          image_urls AS "imageUrls",
          approved,
          created_at AS "createdAt"
      `,
      [body.id, body.approved],
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Review not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      review: result.rows[0],
    });
  } catch (error) {
    console.error("Admin reviews PATCH error:", error);

    return NextResponse.json(
      { error: "Unable to update review." },
      { status: 500 },
    );
  }
}
