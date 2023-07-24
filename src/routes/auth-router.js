import { Router } from 'express';
import { authController } from '../controllers';
import { verifyToken } from '../middlewares';

const authRouter = Router();

// 로그인
authRouter.post('/signin', authController.signIn);

// 비밀번호 초기화
authRouter.put('/signin/password-reset', authController.resetPassword);

// 유효한 사용자인지 확인
authRouter.post('/validation', verifyToken, authController.checkUserValidation);

export default authRouter;
