import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
/* 해당 함수는 프로세스에서 한 번만 호출하면 .env 값들이 전역 객체인 process.env에 담기기 떄문에 
다른 파일에서 dotenv를 참조하지않고 곧바로 process.env로 .env에 접근 할 수 있음 */

const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: "mysql",
        dialectOptions: {
            ssl: { rejectUnauthorized: false },
        },
        logging: false,
    })
    : new Sequelize(
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