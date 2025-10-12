import jwt from "jsonwebtoken";
import User from "../models/User.js";

// jwt토큰 인증
export const protect = async (req, res, next) => {
    let token;

    // Authorization 헤더에서 토큰 추출
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findByPk(decoded.id);
            next();
        } catch (error) {
            return res.status(401).json({ message: "❌ 인증 실패 (유효하지 않은 토큰)" });
        }
    } else {
        return res.status(401).json({ message: "❌ 토큰이 존재하지 않습니다. "});
    }
}