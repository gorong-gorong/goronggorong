import { Router } from 'express';
import { orderController } from '../controllers/index.js';
import { verifyToken } from '../middlewares/index.js';

const router = Router();

// verityToken 필요
// 유저 아이디로 관련된 주문 불러오기 기능 추가해야만
router.post('/orders/payment', orderController.createOrder);
// router.post('/orders/payment', verifyToken, orderController.createOrder);
router.get('/orders/:_id', verifyToken, orderController.getSelectedOrder);
router.get('/orders/user/:_id', orderController.getUserOrders);
router.put('/orders/cancel/:_id', orderController.cancelSelectedOrder); // 주문취소

export { router as orderRouter };
