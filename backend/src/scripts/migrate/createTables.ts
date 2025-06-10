import { query } from "../../config/db";
import { createRolesTable } from "../tables/core/rolesTable";
import { createTokenTable } from "../tables/core/token";
import { createUserTable } from "../tables/core/userTable";
import { createBoxesTable } from "../tables/dots_and_boxes/boxes";
import { createLeaderboardTable } from "../tables/dots_and_boxes/leaderboard";
import { createMatchesTable } from "../tables/dots_and_boxes/matches";
import { createMovesTable } from "../tables/dots_and_boxes/moves";
import { createTicTacToeGames } from "../tables/tic_tac_toe/games";
import { createTicTacToeLeaderboard } from "../tables/tic_tac_toe/leaderboard";
import { createTicMovesTable } from "../tables/tic_tac_toe/moves";

export const createTables = async () => {
  try {
    await query(createRolesTable);
    await query(createUserTable);
    await query(createTokenTable);
    await query(createMatchesTable);
    await query(createLeaderboardTable);
    await query(createMovesTable);
    await query(createBoxesTable);
    await query(createTicTacToeGames);
    await query(createTicMovesTable);
    await query(createTicTacToeLeaderboard);
    console.log("All tables created successfully!");
  } catch (error: unknown | any) {
    console.error("Error creating tables:", error.message);
  }
};
