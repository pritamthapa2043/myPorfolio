import { query } from "../../config/db";
import { alterUserTable } from "../tables/core/userTable";
import { alterTicTacToeGamesTable } from "../tables/tic_tac_toe/games";

export const alterTables = async () => {
  try {
    await query(alterUserTable);
    await query(alterTicTacToeGamesTable);
    console.log("All Alter table done successfully!");
  } catch (error: unknown | any) {
    console.error("❌ Error altering tables:", error.message);
  }
};
