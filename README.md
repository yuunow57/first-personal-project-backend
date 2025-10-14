💰 가상 코인 투자 플랫폼 (Backend)
🧾 프로젝트 개요

이 프로젝트는 가상 코인 투자 시뮬레이션 플랫폼의 백엔드 서버로,
사용자 인증(JWT), 거래 기록, 예외 처리, 실시간 시세 연동까지 구현되어 있습니다.

기술적으로 Express + Sequelize + MySQL + Upbit API를 기반으로 하며
실제 거래소 서비스 수준의 데이터 일관성과 보안 로직을 반영했습니다


⚙️ 기술 스택  

| 구분     | 사용 기술                             |
| ------ | --------------------------------- |
| 서버     | Node.js (Express)                 |
| DB ORM | Sequelize                         |
| 데이터베이스 | MySQL                             |
| 인증     | JWT (jsonwebtoken)                |
| 암호화    | bcryptjs                          |
| 환경 변수  | dotenv                            |
| 외부 API | Upbit Open API                    |
| 기타     | Express-Async-Handler (에러 비동기 처리) |


📁 폴더 구조

📦 first-personal-project  
 ┣ 📂 config          # DB 및 환경변수 설정  
 ┣ 📂 controllers     # 비즈니스 로직 (User, Trade, Auth 등)  
 ┣ 📂 middleware      # JWT 인증 미들웨어  
 ┣ 📂 models          # Sequelize 모델 정의  
 ┣ 📂 routes          # 라우터 (API 경로 관리)  
 ┣ 📂 services        # 외부 API (Upbit 시세) 호출 서비스  
 ┣ 📜 server.js       # Express 서버 진입점  
 ┗ 📜 .env            # 환경 변수 파일  


🔧 환경 변수 (.env)

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mysql123
DB_NAME=first_project
DB_DIALECT=mysql
JWT_SECRET=my_secret_key
UPBIT_BASE_URL=https://api.upbit.com/v1


🚀 실행 방법

1️⃣ 의존성 설치
npm install

2️⃣ 서버 실행
node server.js

3️⃣ 실행 로그 예시
✅ 데이터베이스에 연결 성공
✅ 모든 모델이 데이터베이스와 동기화 됨
✅ 서버가 3000번 포트에서 실행 중


🧩 주요 기능 요약


| 구분             | 설명                              |
| -------------- | ------------------------------- |
| 👤 회원가입 / 로그인  | 비밀번호 bcrypt 암호화, JWT 토큰 발급      |
| 🔐 JWT 인증 미들웨어 | 로그인한 사용자만 거래 가능                 |
| 💰 거래 로직       | 매수/매도 시 잔액 증감 처리 및 유효성 검사       |
| 🔄 트랜잭션 처리     | 거래 중 오류 발생 시 자동 롤백              |
| ⚠️ 예외 처리       | 거래 단위 제한, 잔액 부족, 중복 거래 방지 등     |
| 📈 실시간 시세      | Upbit Open API를 통한 코인 시세 실시간 연동 |


📬 주요 API 예시

🔸 회원가입
POST /api/auth/register
{
  "username": "user01",
  "email": "user01@email.com",
  "password": "1234"
}

🔸 로그인 (JWT 발급)
POST /api/auth/login
{
  "email": "user01@email.com",
  "password": "1234"
}

Response
{
  "message": "✅로그인 성공",
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}

🔸 거래 생성 (로그인 필요)
POST /api/trades
Headers:
  Authorization: Bearer <JWT 토큰>
Body:
{
  "userId": 1,
  "type": "buy",
  "coinName": "BTC",
  "quantity": 1,
  "price": 50000000
}

🔸 전체 거래 조회 (로그인 필요)
GET /api/trades
Headers:
  Authorization: Bearer <JWT 토큰>

🔸 실시간 코인 목록 조회 (Upbit API)
GET /api/coins/

Response
[
  { "market": "KRW-BTC", "korean_name": "비트코인", "english_name": "Bitcoin" },
  { "market": "KRW-ETH", "korean_name": "이더리움", "english_name": "Ethereum" }
]

🔸 실시간 시세 조회
GET /api/price/KRW-BTC

Response
{
  "market": "KRW-BTC",
  "price": 169432000,
  "change": -0.0130941286
}


🧠 프로젝트 흐름 요약

1️⃣ 회원가입
→ 비밀번호 암호화 후 DB 저장

2️⃣ 로그인
→ 이메일과 비밀번호 검증 후 JWT 토큰 발급

3️⃣ 보호된 API 접근
→ Authorization: Bearer <token> 헤더로 인증 통과

4️⃣ 거래 생성/조회/수정/삭제
→ 트랜잭션 + 예외처리로 데이터 일관성 보장

5️⃣ 실시간 시세 조회
→ Upbit API 호출로 최신 시세 실시간 반영


✅ 테스트 완료 항목

 회원가입

 로그인 및 JWT 토큰 검증

 거래 생성 / 조회 / 수정 / 삭제

 중복 거래 방지

 트랜잭션 롤백 처리

 업비트 API 연동


 📘 향후 계획

관리자용 페이지 추가 (회원/거래 관리)

거래 차트 시각화 (Recharts)

프론트엔드 연동 (React 기반)

코인 자동 갱신 기능 구현


👨‍💻 제작자

장윤호 (Jang Yunho)

Node.js 기반 백엔드 엔지니어링 프로젝트
Capstone Design — “가상 코인 투자 시뮬레이터”