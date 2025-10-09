import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST, // DB 서버 주소 ( 보통 localhost )
        dialect: process.env.DB_DIALECT || "mysql", // 사용할 DB 종류
        logging: false, // 콘솔에 SQL 로그 안 나오게
    }    
);

export default sequelize; // .env 설정 내보내기