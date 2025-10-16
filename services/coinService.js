import axios from "axios";

const BASE_URL = process.env.UPBIT_BASE_URL;

// 상장 코인 목록 조회
export const getCoinList = async() => {
    const response = await axios.get(`${BASE_URL}/market/all?isDetails=false`);
    
    // KRW마켓의 시세만 가져오는 필터링
    const krwMarkets = response.data.filter((coin) => coin.market.startsWith("KRW-"));

    return krwMarkets;
};

// 특정 코인 시세 조회
export const getCoinPrice = async (market) => {
    const response = await axios.get(`${BASE_URL}/ticker`, {
        params: { markets: market },
    });

    return response.data[0]; // 배열 형태로 반환되므로 [0] 선택
};

export const getAllCoinPrices = async () => {
    const { data } = await axios.get(`${BASE_URL}/ticker/all`); // 전체 시세 한번에

    const map = {};
    data.forEach((d) => {
        map[d.market] = {
            price: d.trade_price,
            change: d.signed_change_rate,
        }
    });
    return map;
}