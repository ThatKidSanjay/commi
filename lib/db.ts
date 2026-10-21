
import { Pool } from "pg";

const globalForPg = globalThis as typeof globalThis & {
  lhimfPool?: Pool;
};

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const pool = new Pool({
    connectionString,

    // Keep your existing SSL configuration.
    ssl: {
      rejectUnauthorized: false,
    },

    // Avoid opening too many database connections.
    max: 5,

    // Release idle clients after 30 seconds.
    idleTimeoutMillis: 30_000,

    // Fail faster if a new connection cannot be established.
    connectionTimeoutMillis: 10_000,

    // Help detect and handle broken TCP connections.
    keepAlive: true,
    keepAliveInitialDelayMillis: 10_000,
  });

  // Handle errors on idle clients so they don't become unhandled errors.
  pool.on("error", (error) => {
    console.error("Unexpected PostgreSQL pool error:", error);
  });

  return pool;
}

export const pool = globalForPg.lhimfPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForPg.lhimfPool = pool;
}
