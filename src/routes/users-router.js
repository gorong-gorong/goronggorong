import { Router } from 'express';
import { usersController } from '../controllers';
import { tokenHandler } from '../services';

const usersRouter = Router();

// 회원가입
usersRouter.post('/', usersController.createUser);

// 사용자 정보 가져오기
usersRouter.get('/', tokenHandler.verifyAccessToken, usersController.getUser);

// 사용자 정보 수정
usersRouter.put('/', tokenHandler.verifyAccessToken, usersController.updateUser);

// 회원탈퇴
usersRouter.delete('/', tokenHandler.verifyAccessToken, usersController.deleteUser);

export default usersRouter;
