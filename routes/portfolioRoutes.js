import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMyPortfolio } from "../controllers/portfolioController.js";

const router = express.Router();

router.get("/me", protect, getMyPortfolio);

export default router;