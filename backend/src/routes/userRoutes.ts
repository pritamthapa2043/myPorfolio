import express from "express";
import {
  createUserHandler,
  deleteUserIdHandler,
  getUserByIdHandler,
  softDeleteUserByIdHandler,
  updateUserByIdHandler,
} from "../controllers/userControlers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/users/register").post(createUserHandler);
// router.route("/users/change-password").post(changePasswordHandler);
router
  .route("/users/:id")
  .get(authMiddleware, getUserByIdHandler)
  .delete(authMiddleware, deleteUserIdHandler)
  .delete(authMiddleware, deleteUserIdHandler)
  .put(authMiddleware, updateUserByIdHandler);

router
  .route("/users/:id/deactivate")
  .put(authMiddleware, softDeleteUserByIdHandler);

export default router;
