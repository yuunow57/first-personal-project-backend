import express from "express";
import { createTrade, getTrades, getTradeById, updateTrade, deleteTrade } from "../controllers/tradeController.js";
import { protect } from "../middleware/authMiddleware.js";

//여러 경로(API)를 묶어 관리할 수 있는 미니 라우터 객체를 생성하는 코드
const router = express.Router();

router.post("/trades", protect, createTrade); // 거래 생성
router.get("/trades", getTrades); // 전체 거래 내역 조회
router.get("/trades/:id", protect, getTradeById); // 특정 회원 거래 내역 조회
router.put("/trades/:id", protect, updateTrade); // 거래 내역 수정
router.delete("/trades/:id", protect, deleteTrade); // 거래 내역 삭제

export default router;