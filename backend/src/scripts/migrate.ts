import dotenv from "dotenv";
import { createDatabase } from "./db/createDB";
import { createTables } from "./migrate/createTables";
import { createSchema } from "./migrate/createSchema";
import { alterTables } from "./migrate/alterTables";

dotenv.config();

const runMigrations = async () => {
  try {
    console.log("🚀 Running Migrations...");
    console.log("🚀 Creating Database...");
    await createDatabase();
    console.log("🚀 Creating Schema...");
    await createSchema();
    console.log("🚀 Creating Tables...");
    await createTables();

    // console.log("⚡ Applying Triggers...");
    console.log("⚡ Applying Alter Tables...");
    await alterTables();

    process.exit(0); // Exit successfully after migrations complete
  } catch (error: unknown | any) {
    console.error("❌ Migration Failed:", error.message);
    process.exit(1); // Exit with failure code on error
  }
};

runMigrations();
