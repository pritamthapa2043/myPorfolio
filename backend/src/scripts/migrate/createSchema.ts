import { query } from "../../config/db";
import { createCoreSchema } from "../schema/core";
import { createDotsAndBoxesSchema } from "../schema/dots_and_boxes";
import { createTicTacToeSchema } from "../schema/tic_tac_toe";

export const createSchema = async () => {
  try {
    await query(createCoreSchema);
    await query(createDotsAndBoxesSchema);
    await query(createTicTacToeSchema);
    console.log("All Schema created successfully!");
  } catch (error: unknown | any) {
    console.error("Error creating Schema:", error.message);
  }
};
