import { Router } from 'express';
import { userController } from '../controllers/index.js';
import { verifyToken } from '../middlewares/index.js';

const router = Router();

router.post('/signup', userController.createUser);
router.post('/signin', userController.verifyUser);
router.put('/signin/find-password', userController.findPassword);
router.post('/mypage/check-valid-user', verifyToken, userController.mypageVerify);
router.put('/mypage/edit-user-info', verifyToken, userController.myPageUpdate);
router.delete('/mypage/delete-user-info', verifyToken, userController.myPageDelete);

export { router as userRouter };
