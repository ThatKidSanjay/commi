
import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";

export const REVIEW_ADMIN_COOKIE = "lhimf_review_admin";
const SESSION_DURATION = 8 * 60 * 60 * 1000;

function getSecret() {
  const secret = process.env.REVIEWS_ADMIN_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "REVIEWS_ADMIN_SECRET must contain at least 32 characters.",
    );
  }

  return secret;
}

function sign(expires: string) {
  return createHmac("sha256", getSecret())
    .update(expires)
    .digest("hex");
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.REVIEWS_ADMIN_PASSWORD;

  if (!expected || !password) return false;

  const suppliedBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expected);

  return (
    suppliedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(suppliedBuffer, expectedBuffer)
  );
}

export function createAdminSession() {
  const expires = String(Date.now() + SESSION_DURATION);

  return {
    value: `${expires}.${sign(expires)}`,
    maxAge: Math.floor(SESSION_DURATION / 1000),
  };
}

export async function isReviewAdmin() {
  try {
    const cookieStore = await cookies();
    const value = cookieStore.get(
      REVIEW_ADMIN_COOKIE,
    )?.value;

    if (!value) return false;

    const [expires, signature, extra] = value.split(".");

    if (
      !expires ||
      !signature ||
      extra !== undefined ||
      !/^\d+$/.test(expires) ||
      !/^[a-f0-9]{64}$/.test(signature)
    ) {
      return false;
    }

    if (Number(expires) <= Date.now()) {
      return false;
    }

    const expected = sign(expires);
    const suppliedBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expected, "hex");

    return (
      suppliedBuffer.length === expectedBuffer.length &&
      timingSafeEqual(suppliedBuffer, expectedBuffer)
    );
  } catch {
    return false;
  }
}
