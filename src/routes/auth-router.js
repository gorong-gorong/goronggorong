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

// 토큰 재생성
// router.post('/refreshToken', verifyToken, authController.refreshToken); // token 재발급하는 api 있어야 함

export default authRouter;
