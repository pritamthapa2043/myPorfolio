import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const adminPool = new Pool(
  isProduction
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: "postgres", // Default DB for local
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      }
);

export const createDatabase = async () => {
  try {
    if (isProduction) {
      console.log(
        "✅ Production mode — skipping DB creation (managed by Railway)."
      );
      return;
    }

    const dbName = process.env.DB_NAME;

    if (!dbName) {
      throw new Error("❌ Missing DB_NAME in .env file.");
    }

    // Check if the database already exists (local only)
    const checkDb = await adminPool.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (checkDb && checkDb.rowCount && checkDb.rowCount > 0) {
      console.log(`✅ Database "${dbName}" already exists. Skipping creation.`);
      return;
    }

    await adminPool.query(
      `CREATE DATABASE ${dbName} OWNER ${process.env.DB_USER}`
    );
    console.log(`✅ Database "${dbName}" created successfully!`);
  } catch (error: any) {
    console.error("❌ Error creating database:", error.message);
  } finally {
    await adminPool.end();
  }
};
