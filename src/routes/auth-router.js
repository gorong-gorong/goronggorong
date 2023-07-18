import { Router } from 'express';
import { userController, authController } from '../controllers/index.js';
import { verifyToken } from '../middlewares/index.js';

const authRouter = Router();

authRouter.post('/signup', userController.createUser);

authRouter.post('/signin', userController.verifyUser);

authRouter.put('/signin/find-password', userController.findPassword);

authRouter.get('get-user-info', verifyToken, authController.getUserInfo);

// router.post('/refreshToken', verifyToken, authController.refreshToken); // token 재발급하는 api 있어야 함

export default authRouter;
