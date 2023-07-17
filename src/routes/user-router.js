import { Router } from 'express';
import { userController } from '../controllers/index.js';
import { verifyToken } from '../middlewares/index.js';

const userRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: User/Token Authorization
 */

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: 로그인
 *     tags: [Auth]
 *     requestBody:
 *       x-name: body
 *       description: 사용자 ID, password를 입력
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: success
 */

userRouter.post('/signup', userController.createUser);
userRouter.post('/signin', userController.verifyUser);
userRouter.put('/signin/find-password', userController.findPassword);
userRouter.post('/mypage/check-valid-user', verifyToken, userController.mypageVerify);
userRouter.put('/mypage/edit-user-info', verifyToken, userController.myPageUpdate);
userRouter.delete('/mypage/delete-user-info', verifyToken, userController.myPageDelete);

export default userRouter;
