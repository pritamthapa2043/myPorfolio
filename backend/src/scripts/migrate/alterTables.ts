import { query } from "../../config/db";
import { alterUserTable } from "../tables/core/userTable";

export const alterTables = async () => {
  try {
    await query(alterUserTable);

    console.log("All Alter table done successfully!");
  } catch (error: unknown | any) {
    console.error("❌ Error altering tables:", error.message);
  }
};
