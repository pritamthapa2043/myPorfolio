import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {
  getUserByEmail,
  reactivateUser,
  updateRefreshToken,
} from "../models/userModels";

dotenv.config();

export const loginUserHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const roles = Array.isArray(user.roles) ? user.roles : [user.roles];

    const accessToken = jwt.sign(
      { id: user.id, roles },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_SECRET!,
      { expiresIn: "7d" }
    );
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await updateRefreshToken(refreshToken, user.id, expiresAt);
    if (user.deleted_at !== null) {
      await reactivateUser(user.id);
    }

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles,
      },
    });
  } catch (error: unknown | any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
