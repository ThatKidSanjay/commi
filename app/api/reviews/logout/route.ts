
import { NextResponse } from "next/server";
import { REVIEW_ADMIN_COOKIE } from "@/lib/review-admin";

export async function POST() {
  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set(REVIEW_ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return response;
}
