import bcrypt from "bcrypt";
import {
  createUser,
  deactivateUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  updateUser,
} from "../models/userModels";
import { Request, Response } from "express";
import { AuthRequest } from "../types/types";

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const { username, email, password, roles } = req.body;
    const isUserExist = await getUserByEmail(email);
    if (isUserExist) {
      res.status(400).send({ message: "User already exists" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await createUser(username, email, hashedPassword, roles);
    res.status(201).send({ message: "User Created" });
  } catch (error: unknown | any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserByIdHandler = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;
    const requesterId = req.user?.id;
    const requesterRoles = req.user?.roles || []; // Ensure roles is always an array

    // Allow admins to fetch any user, but normal users can only fetch themselves
    const isAdmin = requesterRoles.includes("admin"); // Check if user has admin role

    if (!isAdmin && Number(requesterId) !== Number(userId)) {
      res
        .status(403)
        .json({ message: "Forbidden: You can only access your own data." });
      return;
    }

    const user = await getUserById(Number(userId));
    if (!user) {
      res.status(404).send({ message: "User does not exist" });
      return;
    }

    res.send(user);
  } catch (error: unknown | any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserByIdHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;
    const requesterId = req.user?.id;
    const requesterRoles = req.user?.roles || []; // Ensure roles is always an array

    // Allow admins to fetch any user, but normal users can only fetch themselves
    const isAdmin = requesterRoles.includes("admin"); // Check if user has admin role

    if (!isAdmin && Number(requesterId) !== Number(userId)) {
      res
        .status(403)
        .json({ message: "Forbidden: You can only access your own data." });
      return;
    }

    const user = await getUserById(Number(userId));
    if (!user) {
      res.status(404).send({ message: "User does not exist" });
      return;
    }

    await updateUser(username, email, Number(userId));

    res.status(200).send({ message: "User updated" });
  } catch (error: unknown | any) {
    res.status(500).json({ error: error.message });
  }
};

export const softDeleteUserByIdHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.params.id;
    const { password } = req.body;
    const requesterId = req.user?.id;
    const requesterRoles = req.user?.roles || [];

    const isAdmin = requesterRoles.includes("admin"); // Check if user has admin role

    if (!isAdmin && Number(requesterId) !== Number(userId)) {
      res
        .status(403)
        .json({ message: "Forbidden: You can only access your own data." });
      return;
    }

    const user = await getUserById(Number(userId));

    if (!user) {
      res.status(404).send({ message: "User does not exist" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }
    const currentTime = new Date().toISOString();

    await deactivateUser(Number(userId), currentTime);

    res.status(200).send({ message: "User Deactivated" });
  } catch (error: unknown | any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserIdHandler = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;
    const requesterRoles = req.user?.roles || []; // Ensure roles is always an array

    // Allow admins to fetch any user, but normal users can only fetch themselves
    const isAdmin = requesterRoles.includes("admin"); // Check if user has admin role

    if (!isAdmin) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    const user = await getUserById(Number(userId));
    if (!user) {
      res.status(404).send({ message: "User does not exist" });
      return;
    }

    await deleteUser(Number(userId));
    res.status(200).send({ message: "User deleted" });
  } catch (error: unknown | any) {
    res.status(500).json({ error: error.message });
  }
};
