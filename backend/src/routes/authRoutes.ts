import express from "express";
import { loginUserHandler } from "../controllers/authControllers";

const router = express.Router();

router.route("/login").post(loginUserHandler);

export default router;
