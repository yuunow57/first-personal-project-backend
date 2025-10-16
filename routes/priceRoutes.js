import express from "express";
import asyncHandler from "express-async-handler";
import { getCoinList, getCoinPrice, getAllCoinPrices } from "../services/coinService.js";

const router = express.Router();

// 상장 코인 목록 조회 API
// GET /api/coins
router.get("/coins", asyncHandler(async (req, res) => {
    const coins = await getCoinList();
    res.status(200).json({
        message: "✅ 코인 목록 조회 성공",
        count: coins.length,
        coins,
    });
}));


// 특정 코인 시세 조회 API
// GET /api/price/:market
router.get("/price/:market", asyncHandler(async (req, res) => {
    const { market } = req.params;
    if (!market)
        return res.status(400).json({ message: "❌ 마켓 코드가 필요합니다. (예: KRW-BTC)" });

    const priceInfo = await getCoinPrice(market);
    res.status(200).json({
        message: "✅ 시세 조회 성공",
        market,
        price: priceInfo.trade_price,
        change: priceInfo.signed_change_rate,
    });
}));

// 모든 코인 시세 조회 API
// GET /api/prices
router.get("/prices", asyncHandler(async (req, res) => {
    const prices = await getAllCoinPrices();
    
    res.status(200).json({
        message: "✅ 시세 조회 성공",
        prices,
    });
}));

export default router;