import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// 회원 생성
export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // 비밀번호 유효성 검사
    if (!password || password.length < 4)
        return res.status(400).json({ message: "❌ 비밀번호는 4자 이상이어야 합니다. "});
    
    // 중복 이메일 검사
    const existingUser = await User.findOne({ where : { email } });
    if (existingUser)
        return res.status(400).json({ message: "❌ 이미 존재하는 이메일입니다. "});

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10); // 암호화 강도 10

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    res.status(201).json({
        message: "✅ 회원가입 완료",
        user : { id: newUser.id, username: newUser.username, email: newUser.email },
    });
});

// 로그인 api
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
        return res.status(404).json({ message: "❌ 사용자 없음 " });

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password); 
                                        // 요청된 비밀번호를 암호화 해서 DB에 저장된 암호화 된 비밀번호와 같은지 확인 true/false
    if (!isMatch)
        return res.status(401).json({ message: "❌ 비밀번호가 올바르지 않습니다." });

    // JWT 토큰 발급
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
        message: "✅로그인 성공",
        token,
    });
});