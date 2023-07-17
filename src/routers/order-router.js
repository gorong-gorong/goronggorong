import { Router } from 'express';
import { orderController } from '../controllers/index.js';
import { verifyToken } from '../middlewares/index.js';

const router = Router();

router.post('/orders/payment', verifyToken, orderController.createOrder);
router.get('/orders/:_id', verifyToken, orderController.getSelectedOrder);
router.get('/orders/user/order-list', verifyToken, orderController.getUserOrders);
router.put('/orders/cancel/:_id', verifyToken, orderController.cancelSelectedOrder); // 주문취소

export { router as orderRouter };
