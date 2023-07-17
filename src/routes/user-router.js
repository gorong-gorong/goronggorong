import { Router } from 'express';
import { userController } from '../controllers/index.js';
import { verifyToken } from '../middlewares/index.js';

const userRouter = Router();

userRouter.post('/signup', userController.createUser);
userRouter.post('/signin', userController.verifyUser);
userRouter.put('/signin/find-password', userController.findPassword);
userRouter.post('/mypage/check-valid-user', verifyToken, userController.mypageVerify);
userRouter.put('/mypage/edit-user-info', verifyToken, userController.myPageUpdate);
userRouter.delete('/mypage/delete-user-info', verifyToken, userController.myPageDelete);

export default userRouter;
