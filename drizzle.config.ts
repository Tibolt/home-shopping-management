// drizzle.config.ts

import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

// this is needed for pushing
dotenv.config({ path: ".env.local" });

const config: Config = {
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/out",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!
  }
};

export default config;