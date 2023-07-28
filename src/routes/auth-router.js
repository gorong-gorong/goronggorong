import { Router } from 'express';
import { authController } from '../controllers';
import { tokenHandler } from '../services';

const authRouter = Router();

// 로그인
authRouter.post('/signin', authController.signIn);

// 비밀번호 초기화
authRouter.put('/signin/password-reset', authController.resetPassword);

// 유효한 사용자인지 확인
authRouter.post('/validation', tokenHandler.verifyAccessToken, authController.checkUserValidation);

// 새로운 AccessToken 발급
authRouter.post('/tokens', tokenHandler.verifyRefreshToken, tokenHandler.getNewAccessToken);

/**
 * 로그아웃시 토큰 무효화
 * Refresh Token: Redis에서 삭제
 * Access Token: Redis blacklist에 추가
 */
authRouter.delete('/tokens', tokenHandler.deleteTokens);

export default authRouter;
