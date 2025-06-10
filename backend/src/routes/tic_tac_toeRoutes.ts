import express from "express";

import {
  getGameByRoomID,
  getLeaderboard,
} from "../controllers/ticTacToeControllers";

const router = express.Router();

router.route("/games").get(getGameByRoomID);
router.route("/leaderboard").get(getLeaderboard);

export default router;
