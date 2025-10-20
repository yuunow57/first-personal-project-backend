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

// 여러 코인 시세 조회
export const getCoinsPrice = async (markets = []) => { // 배열 매개변수
    if (!markets.length) return {}; // 입력받은 매개변수가 비어있으면

    const chunks = [];
    for (let i = 0; i < markets.length; i += 100)
        chunks.push(markets.slice(i, i + 100)); // 입력받은 배열을 첫번째부터 100개씩 담음

    const result = {};
    for (const part of chunks) {
        const qs = part.join(","); // 입력받은 배열을 ,로 구분하여 qs에 하나로 합침 ( 최대 100개의 market )
        const { data } = await axios.get(`${BASE_URL}/ticker?markets=${qs}`);

        data.forEach((t) => { result[t.market] = t.trade_price; }); 
        // { market: "KRW-BTC", price: 1234 } 구조를 { "KRW-BTC": 1234 }구조로 변경
    }    
    return result;
}


// 모든 코인 시세 조회
export const getAllCoinPrices = async () => {
    const response = await axios.get(`${BASE_URL}/market/all?isDetails=false`); // 응답자료의 .data를 markets에 할당한다는 뜻

    const krwMarkets = response.data.filter((coin) => coin.market.startsWith("KRW-"));

    const marketNames = krwMarkets.map((c) => c.market).join(","); //krwMarkets 배열에서 market요소만 뽑아서 ,를 구분으로 하나의 문자열로 반환

    const tickers = await axios.get(`${BASE_URL}/ticker`, {
        params: { markets: marketNames }, // 모든 시세 불러오기
    });

    const map = {};
    tickers.data.forEach((d) => {
        map[d.market] = { // 가져온 데이터를 map이라는 배열에 키:market, 값:price,change를 가진 배열로 할당
            price: d.trade_price,
            change: d.signed_change_rate,
        };
    });

    return map;
}

// 24시간 변동률 정보 가져오기
export const getCandles = async (market) => {
    const { data } = await axios.get(`${BASE_URL}/candles/minutes/60?market=${market}&count=24`);

    const changes = data.map(item => ({
        price: item.trade_price,
        time: item.timestamp,
    }));

    return changes;
}