🪙 가상 코인 투자 플랫폼 (Virtual Crypto Investment)
📌 프로젝트 개요

Node.js + Express + Sequelize를 이용해 제작한 가상 코인 투자 웹 애플리케이션 백엔드입니다.
사용자는 회원가입 후 코인 거래(매수/매도)를 수행할 수 있으며, 모든 데이터는 MySQL 데이터베이스에 저장됩니다.


🧱 기술 스택
| 구분           | 기술               |
| ------------ | ---------------- |
| **Language**      | JavaScript (ES6) |
| **Runtime**      | Node.js |
| **Framework**      | Express |
| **ORM**      | Sequelize        |
| **Database**   | MySQL            |
| **환경 변수 관리** | dotenv           |
| **API 테스트 도구**  | Thunder Client          |


⚙️ 주요 기능  
🧍 User (회원)
| 기능       | 메서드    | 엔드포인트            | 설명           |
| -------- | ------ | ---------------- | ------------ |
| 회원 등록    | POST   | `/api/users`     | 신규 회원 등록     |
| 전체 회원 조회 | GET    | `/api/users`     | 등록된 모든 회원 조회 |
| 특정 회원 조회 | GET    | `/api/users/:id` | ID로 회원 조회    |
| 회원 정보 수정 | PUT    | `/api/users/:id` | 회원 정보 업데이트   |
| 회원 삭제    | DELETE | `/api/users/:id` | 회원 삭제        |

💱 Trade (거래)
| 기능       | 메서드    | 엔드포인트             | 설명          |
| -------- | ------ | ----------------- | ----------- |
| 거래 생성    | POST   | `/api/trades`     | 매수/매도 거래 등록 |
| 전체 거래 조회 | GET    | `/api/trades`     | 모든 거래 내역 조회 |
| 특정 거래 조회 | GET    | `/api/trades/:id` | 거래 ID로 조회   |
| 거래 수정    | PUT    | `/api/trades/:id` | 거래 정보 수정    |
| 거래 삭제    | DELETE | `/api/trades/:id` | 거래 삭제       |

🧩 폴더 구조
📁 first-personal-project  
 ┣ 📁 config  
 ┃ ┗ database.js  
 ┣ 📁 controllers  
 ┃ ┣ userController.js  
 ┃ ┗ tradeController.js  
 ┣ 📁 models  
 ┃ ┣ User.js  
 ┃ ┗ Trade.js  
 ┣ 📁 routes  
 ┃ ┣ userRoutes.js  
 ┃ ┗ tradeRoutes.js  
 ┣ 📄 .env  
 ┣ 📄 package.json  
 ┗ 📄 server.js  

🚀 실행 방법
1. 패키지 설치
npm install express sequelize mysql2 dotenv express-async-handler

2. .env 파일 설정  
DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=비밀번호  
DB_NAME=first_project  
DB_DIALECT=mysql  

3. 서버 실행
node server.js

4. 테스트 (Thunder Client)

- URL: http://localhost:3000/api/users
- URL: http://localhost:3000/api/trades

📚 프로젝트 진행 기록
| 날짜         | 내용                              |
| ---------- | ------------------------------- |
| **Day1.0** | Express 서버 구축 및 Sequelize 연결 설정 |
| **Day1.1** | User / Trade 테이블 모델링            |
| **Day2.0** | User CRUD API 구현 완료             |
| **Day2.1** | Trade CRUD API 구현 완료            |
| **Day3.0** | 거래 로직 및 유효성 검사 추가         |
