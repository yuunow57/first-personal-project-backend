import asyncHandler from "express-async-handler";
import Trade from "../models/Trade.js";
import User from "../models/User.js"; // 거래의 주인을 확인하기 위함

// ✅ 거래 생성 (Create)
export const createTrade = asyncHandler(async (req, res) => {
    const { userId, type, coinName, quantity, price, } = req.body;
    
    const user = await User.findByPk(userId); // userId가 없을시 에러처리
    if (!userId)
        return res.status(404).json({ message: "❌ 해당 사용자를 찾을 수 없습니다." });
    
    const totalAmount = quantity * price;
    const newTrade = await Trade.create({
        userId,
        type,
        coinName,
        quantity,
        price,
        totalAmount,
    });

    res.status(201).json({
        message: "✅ 거래 등록 완료",
        trade: newTrade,
    });
});

// ✅ 모든 거래 내역 조회 (Read All)
export const getTrades = asyncHandler(async (req, res) => {
    const trades = await Trade.findAll({ include: User }); // Include: User = Trade를 조회하면서 그 userId에 대응하는 Id를 가진 User의 정보도 가져옴

    res.status(200).json({
        message: "✅ 전체 거래 내역 조회 성공",
        trades,
    })
})

// ✅ 특정 거래 조회 (Read One)
export const getTradeById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const trade = await Trade.findByPk(id, { include: User });

    if (!trade)
        return res.status(404).json({ message: " ❌ 해당 거래를 찾을 수 없습니다. "});

    res.status(200).json({
        message: "✅ 거래 조회 성공",
        trade,
    });
});

// ✅ 거래 수정 (Update)
export const updateTrade = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId, type, coinName, quantity, price, } = req.body;

    const trade = await Trade.findByPk(id);

    if (!trade)
        return res.status(404).json({ message: " ❌ 해당 거래를 찾을 수 없습니다. "});

    trade.type = type || trade.type;
    trade.coinName = coinName || trade.coinName;
    trade.quantity = quantity || trade.quantity;
    trade.price = price || trade.price;
    trade.totalAmount = trade.quantity * trade.price;

    await trade.save(); // 변경사항 DB 반영

    res.status(200).json({
        message: "✅ 거래 수정 완료",
        trade,
    });
});

// ✅ 거래 삭제 (Delete)
export const deleteTrade = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleted = await Trade.destroy({ where: { id } });

    if (deleted === 0)
       return res.status(404).json({ message: " ❌ 해당 거래를 찾을 수 없습니다. "});

    res.status(200).json({
        message: "✅ 거래 삭제 성공",
    });
});