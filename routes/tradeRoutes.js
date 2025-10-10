import express from "express";
import { createTrade, getTrades, getTradeById, updateTrade, deleteTrade } from "../controllers/tradeController.js";

const router = express.Router();

router.post("/trades", createTrade);
router.get("/trades", getTrades);
router.get("/trades/:id", getTradeById);
router.put("/trades/:id", updateTrade);
router.delete("/trades/:id", deleteTrade);

export default router;