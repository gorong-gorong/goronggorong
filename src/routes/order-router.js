import { Router } from 'express';
import { orderController } from '../controllers/index.js';
import { verifyToken } from '../middlewares/index.js';

const orderRouter = Router();

orderRouter.post('/orders/payment', verifyToken, orderController.createOrder);
orderRouter.get('/orders/:_id', verifyToken, orderController.getSelectedOrder);
orderRouter.get('/orders/user/order-list', verifyToken, orderController.getUserOrders);
orderRouter.put('/orders/cancel/:_id', verifyToken, orderController.cancelSelectedOrder); // 주문취소

export default orderRouter;
