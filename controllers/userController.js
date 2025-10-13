import asyncHandler from "express-async-handler"; // 비동기 함수의 에러를 자동으로 처리하는 미들웨어
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// 회원 등록 (Create)
export const createUser = asyncHandler(async (req, res) => { // 여러개를 내보내기 함수앞에 export 적용
    const { username, email, password } = req.body; // 클라이언트가 보낸 Json 데이터 받기

    // 비밀번호 유효성 검사
    if (!password || password.length < 4)
        return res.status(400).json({ message: "❌ 비밀번호는 4자 이상이어야 합니다. "});

    // 이미 존재하는 이메일 검사
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
        return res.status(400).json({ message: "❌ 이미 존재하는 이메일입니다." });

    // 비밀번호 암호화 (10은 saltRounds, saltRounds란 암호화 강도)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ // User.create = Sequelize 함수로 Sql문의 INSERT와 같은 기능
        username,
        email,
        password: hashedPassword,
        // 위 2줄의 코드도 객체 축약 원리 적용 ex) username(컬럼명) : username(변수)
    });

    res.status(201).json({ // 응답 상태 코드 201 전송
        message: "✅ 회원 등록 완료",
        user: newUser, // 생성된 user의 행 보여주기
    });
});

// 전체 유저 조회 (Read)
export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.findAll(); // (User).findAll() = SELECT * FROM (User) SQL문과 동일 역할

    res.status(200).json({ // 응답 상태 코드 200 전송
        message: "✅ 전체 사용자 조회 성공",
        users, // 가져온 User 테이블 모든 정보 보여주기
    });
});

// ✅ 특정 유저 조회 (Read One)
export const getUsersById = asyncHandler(async (req, res) => {
    const { id } = req.params; // URL 경로에 있는 id 값 추출

    const user = await User.findByPk(id);

    if(!user) 
        return res.status(404).json({ message: "❌ 해당 사용자를 찾을 수 없습니다."});

    res.status(200).json({
        message: "✅ 사용자 조회 성공",
        user,
    });
});

// ✅ 특정 유저 정보 수정 (Update)
export const updateUsers = asyncHandler(async (req, res) => {
    const { id } = req.params; // URL 에서 ID 추출
    const { username, email, password } = req.body; // 요청 Body 데이터 추출

    const user = await User.findByPk(id); // ID로 수정할 유저 찾기

    if(!user)  // ID에 해당하는 유저가 없을시 에러처리
        return res.status(404).json({ message: "❌ 해당 사용자를 찾을 수 없습니다."});

    user.username = username || user.username; // 요청된 항목은 들어온 값으로 수정하고 요청하지 않은 항목은 기존값 유지
    user.email = email || user.email; // email = 클라이언트에서 수정 요청된 값을 가지고 있음, user.email = 기존 user행의 email값을 가지고 있음 
    user.password = password || user.password;

    await user.save(); // 변경사항 DB 반영

    res.status(200).json({ // 응답 상태 코드 200 전송
        message: "✅ 사용자 정보 수정 성공",
        user, // 수정된 사용자 정보 보여주기
    });
});

// 회원 정보 삭제 (Delete)
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const deleted = await User.destroy({ where: { id } }); // (User).destroy({ where: { id: id} }) = DELETE FROM User WHERE id = id (ex 1) 
                              // destroy는 삭제된 행의 개수를 반환 1 = 정상삭제, 0 = 조건에 맞는 데이터 없음// 위 SQL문과 같은 기능
                            // 객체 축약 원리에 따라 { id : id }를 id로 기입, * [ 객체 축약 원리란 키와 값이 같으면 한쪽 생략 가능 ] *
    if (deleted === 0) // 조건에 맞는 데이터가 없어서 deleted에 0이 반환됐으면
        return res.status(404).json({ message: "❌ 해당 사용자를 찾을 수 없습니다." });    

    res.status(200).json({ // 응답 상태 코드 200 전송
        message: "✅ 사용자 정보 삭제 성공",
    });    
});