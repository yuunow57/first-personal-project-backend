import asyncHandler from "express-async-handler"
import Trade from "../models/Trade.js";
import { getCoinsPrice } from "../services/coinService.js";

// GET /api/me
export const getMyPortfolio = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const balance = Number(req.user.balance); // 로그인 된 사용자의 자본금을 인수화 해서 가져옴

    // 내 모든 거래 불러오기
    const trades = await Trade.findAll({
        where: { userId },
        attributes: ["coinName", "type", "quantity"], // coinName, type, quantity 컬럼만 가져오기
        raw: true, // Json형태로 반환
    });

    // 코인 별 보유 수량
    const qtyByMarket  = {};
    for (const t of trades) {
        const m = t.coinName;
        const q = Number(t.quantity) || 0;
        
        if (!qtyByMarket[m]) qtyByMarket[m] = 0; // 초기값 0 설정
        qtyByMarket[m] += (t.type === "buy"? q : -q); // 거래유형이 buy면 갯수만큼 더하기, 아니면 갯수만큼 빼기
     }

     // 0 이하 종목 제거
     const markets = Object.entries(qtyByMarket) // 객체를 2차원 배열로 변환
     .filter(([, qty]) => qty > 0) // 배열 구조분해로 [market, qty]중 qty만 사용, 그중 0보다 큰것만 필터
     .map(([m]) => m); // 배열 구조부냏로 첫 번쨰 요소(코인 이름)만 꺼내오기

     let prices = {};
     if (markets.length) {
        prices = await getCoinsPrice(markets);
     }

     // 코인별 평가액 계산
     const coins = markets.map((m) => {
        const quantity = qtyByMarket[m];
        const price = Number(prices[m]);
        const value = quantity * price;
        return { market: m, quantity, price, value };
     });

     // 총 코인 가치
     const totalCoinValue = coins.reduce((sum, c) => sum + c.value, 0); // reduce는 ((누적값, 현재값(순환변수)) => 누적값 + coins.value, 초기값)
     const totalAsset = balance + totalCoinValue // 총 자산

     res.status(200).json({
        message: "✅ 내 자산 조회 성공",
        balance,
        totalCoinValue,
        totalAsset,
        coins,
     });
});