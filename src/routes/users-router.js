import { Router } from 'express';
import { usersController } from '../controllers';
import { verifyToken } from '../middlewares';

const userRouter = Router();

// 회원가입
userRouter.post('/', usersController.createUser);

// 사용자 정보 가져오기
userRouter.get('/', verifyToken, usersController.getUser);

// 사용자 정보 수정
userRouter.put('/', verifyToken, usersController.updateUser);

// 사용자 정보 삭제
userRouter.delete('/', verifyToken, usersController.deleteUser);

export default userRouter;
