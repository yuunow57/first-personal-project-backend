import express from "express";
import { createUser, getUsers, getUsersById, updateUsers, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/users", createUser); // 회원 등록
router.get("/users", getUsers); // 전체 조회
router.get("/users/:id", getUsersById); // 특정 유저 조회, /users/:id = /users/ 다음에 오는 값 하나를 id라는 변수로 받아라 -> req.params.id < 여기에 저장
router.put("/users/:id", updateUsers); // 사용자 정보 수정
router.delete("/users/:id", deleteUser); // 사용자 정보 삭제

export default router;