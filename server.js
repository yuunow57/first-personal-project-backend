import express from "express";
import sequelize from "./config/database.js";
import User from "./models/User.js";

const PORT = 3000;
const app = express();
app.use(express.json());

// DB 연결 테스트
const connectDB = async() => {
    try {
        await sequelize.authenticate();
        console.log("✅ 데이터베이스에 연결 성공");
        await sequelize.sync({ alter: true });
        console.log("✅ 모든 모델이 데이터베이스와 동기화 됨");
    } catch (error) {
        console.error("❌ 데이터베이스 연결 실패", error);
    }
};

connectDB();

// 서버 기본 라우트
app.get("/", (req, res) => {
    res.send("서버가 정상적으로 실행 중");
});

// 서버 실행

app.listen(PORT, () => console.log(`✅ 서버가 ${PORT}번 포트에서 실행 중`));