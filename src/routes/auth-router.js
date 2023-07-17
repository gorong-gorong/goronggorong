import { Router } from 'express';
import { authController } from '../controllers/index.js';
import { verifyToken } from '../middlewares/index.js';

const router = Router();

// router.post('/refreshToken', verifyToken, authController.refreshToken); // token 재발급하는 api 있어야 함
router.get('/auth/get-user-info', verifyToken, authController.getUserInfo);

export { router as authRouter };
