import { Router } from 'express';
import { userController } from '../controllers';
import { verifyToken } from '../middlewares';

const userRouter = Router();

// 회원가입
userRouter.post('/', userController.createUser);

// 사용자 정보 가져오기
userRouter.get('/', verifyToken, userController.getUser);

// 사용자 정보 수정
userRouter.put('/', verifyToken, userController.updateUser);

// 사용자 정보 삭제
userRouter.delete('/', verifyToken, userController.deleteUser);

export default userRouter;
