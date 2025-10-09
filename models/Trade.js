import { DataTypes } from "sequelize"; // sequelize 모듈에서 { } 안에 적힌 항목만 가져오기 ( 다중 가능 )
import sequelize from "../config/database.js";

const Trade = sequelize.define("Trade", { // 테이블 생성 함수 define("이름", 구조)
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // 기본키 설정
        autoIncrement: true, // 새로운 데이터가 추가될 떄마다 1씩 증가한 값 추가
    },
    type: {
        type: DataTypes.ENUM("buy", "sell"), // 거래 종류 (매수/매도)
        allowNull: false,
    },
    coinName: { // 거래한 코인 이름
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    quantity: { // 거래 수량
        type: DataTypes.DECIMAL(18, 8),
        allowNull: false,
    },
    price: { // 코인 거래 가격
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false,
    },
    totalAmount: { // 거래 총액
        type: DataTypes.DECIMAL(18, 2), 
        allowNull: false,
    },
});

export default Trade;