// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";

import * as schema from "./schema"

// const connectionString = process.env.DATABASE_URL || "";
// const client = postgres(connectionString);
// const db = drizzle(client, { schema });

// export { client, db };

import { Pool } from "pg";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";

import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL)
  throw new Error("Cannot migrate. DATABASE_URL is not set");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle(pool, { schema });