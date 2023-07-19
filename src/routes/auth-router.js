import { Router } from 'express';
import { authController } from '../controllers';
import { verifyToken } from '../middlewares';

const authRouter = Router();

// 회원가입
authRouter.post('/signup', authController.signUp);

// 로그인
authRouter.post('/signin', authController.signIn);

// 비밀번호 초기화
authRouter.put('/signin/password-reset', authController.resetPassword);

// 토큰 기반 사용자 정보 가져오기
authRouter.get('/user-info', verifyToken, authController.getUserInfo);

// router.post('/refreshToken', verifyToken, authController.refreshToken); // token 재발급하는 api 있어야 함

export default authRouter;
