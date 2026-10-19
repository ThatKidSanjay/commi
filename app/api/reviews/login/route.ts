
import { NextRequest, NextResponse } from "next/server";
import {
  createAdminSession,
  REVIEW_ADMIN_COOKIE,
  verifyAdminPassword,
} from "@/lib/review-admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (
      typeof body.password !== "string" ||
      !verifyAdminPassword(body.password)
    ) {
      return NextResponse.json(
        { error: "Invalid password." },
        { status: 401 },
      );
    }

    const session = createAdminSession();

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set(
      REVIEW_ADMIN_COOKIE,
      session.value,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: session.maxAge,
      },
    );

    return response;
  } catch {
    return NextResponse.json(
      { error: "Unable to sign in." },
      { status: 500 },
    );
  }
}
