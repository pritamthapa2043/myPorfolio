import { Request, Response } from "express";
import { getGame, getLeaderboardData } from "../models/gamesModel";

export const getGameByRoomID = async (req: Request, res: Response) => {
  try {
    const roomId = req.query.roomId as string;
    console.log("reached");
    const room = await getGame(roomId);
    if (Number(room) === 0) {
      res.send({ message: "Room does not exist" });
      return;
    } else {
      res.send({ message: "Room does exist" });
      return;
    }
  } catch (error: unknown | any) {
    res.status(500).json({ error: error.message });
  }
};

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const result = await getLeaderboardData();
    res.json(result);
  } catch (error: unknown | any) {
    res.status(500).json({ error: error.message });
  }
};
