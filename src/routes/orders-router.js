import { Router } from 'express';
import { ordersController } from '../controllers';
import { verifyToken } from '../middlewares';

const ordersRouter = Router();

ordersRouter.post('/orders/payment', verifyToken, ordersController.createOrder);

ordersRouter.get('/orders/:_id', verifyToken, ordersController.getSelectedOrder);

ordersRouter.get('/orders/user/order-list', verifyToken, ordersController.getUserOrders);

ordersRouter.put('/orders/cancel/:_id', verifyToken, ordersController.cancelSelectedOrder); // 주문취소

export default ordersRouter;
