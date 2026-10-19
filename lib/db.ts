import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const globalForPg = globalThis as unknown as {
  pgPool?: Pool;
};

export const pool =
  globalForPg.pgPool ??
  new Pool({
    connectionString,
    max: 5,
    ssl: { rejectUnauthorized: true },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pgPool = pool;
}