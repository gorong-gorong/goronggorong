import { Router } from 'express';
import { usersController } from '../controllers';
import { verifyToken } from '../middlewares';

const usersRouter = Router();

// 회원가입
usersRouter.post('/', usersController.createUser);

// 사용자 정보 가져오기
usersRouter.get('/', verifyToken, usersController.getUser);

// 사용자 정보 수정
usersRouter.put('/', verifyToken, usersController.updateUser);

// 회원탈퇴
usersRouter.delete('/', verifyToken, usersController.deleteUser);

export default usersRouter;
