import asyncHandler from "express-async-handler";
import Trade from "../models/Trade.js";
import User from "../models/User.js"; // 거래의 주인을 확인하기 위함

// ✅ 거래 생성 (Create)
export const createTrade = asyncHandler(async (req, res) => {
    const { userId, type, coinName, quantity, price, } = req.body;
    
    const user = await User.findByPk(userId); 
    if (!user) // userId가 없을시 에러처리
        return res.status(404).json({ message: "❌ 해당 사용자를 찾을 수 없습니다." });

    // 유효성 검사 부분
    if (!type || !coinName || !quantity || !price) // 필수 입력값 누락 확인
        return res.status(400).json({ message: "❌ 필수 입력값이 누락되었습니다." });

    if (quantity <= 0 || price <= 0) // 수량과 가격 음수체크
        return res.status(400).json({ message: "❌ 수량과 가격은 0보다 커야 합니다." });
    
    if (!["buy", "sell"].includes(type)) // 거래 유형 검사 ( .includes(type) : type이 해당 배열 안에 포함되어 있는지를 true/false로 반환 )
        return res.status(400).json({ message: "❌ 잘못된 거래 유형입니다." });

    const totalAmount = quantity * price;

    // 잔액 증감 처리 부분
    if (type === "buy") {
        if (user.balance < totalAmount)
            return res.status(400).json({ message: "❌ 잔액이 부족합니다." });
        user.balance = Number(user.balance) - totalAmount;
    } else if (type === "sell") {
        user.balance = Number(user.balance) + totalAmount;
    }

    await user.save(); // 증감 처리 저장
    
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