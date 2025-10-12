import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);// login작업은 단순히 정보를 "가져오는 것"이 아니라, 정보를 "보내서 인증을 요청하는 처리과정"
                                // 이기 때문에 post 메서드를 사용해야 한다

export default router;