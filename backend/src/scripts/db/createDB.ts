import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Connect to the default `postgres` database
const adminPool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: "postgres", // Always exists
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export const createDatabase = async () => {
  try {
    const dbName = process.env.DB_NAME;

    if (!dbName) {
      throw new Error("❌ Missing DB_NAME in .env file.");
    }

    // Check if the database already exists
    const checkDb = await adminPool.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (checkDb && checkDb.rowCount && checkDb.rowCount > 0) {
      console.log(`✅ Database "${dbName}" already exists. Skipping creation.`);
      return;
    }

    // Create the database if it doesn't exist
    await adminPool.query(
      `CREATE DATABASE ${dbName} OWNER ${process.env.DB_USER}`
    );

    console.log(`✅ Database "${dbName}" created successfully!`);
  } catch (error: any) {
    console.error("❌ Error creating database:", error.message);
  } finally {
    await adminPool.end(); // Close the admin connection
  }
};
