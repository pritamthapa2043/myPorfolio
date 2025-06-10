import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import tic_tac_toeRoutes from "./routes/tic_tac_toeRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ticTacToe", tic_tac_toeRoutes);
// app.use("/api", roleRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
