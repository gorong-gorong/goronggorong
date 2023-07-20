import { Router } from 'express';
import { ordersController } from '../controllers';
import { verifyToken } from '../middlewares';

const ordersRouter = Router();

// 결제
ordersRouter.post('/payment', verifyToken, ordersController.createOrder);

// 주문 상세
ordersRouter.get('/:_id', verifyToken, ordersController.getSelectedOrder);

// 주문취소 -> 나중에 /:id/cancellation
ordersRouter.put('/cancel/:_id', verifyToken, ordersController.cancelSelectedOrder); // 주문취소

// 사용자별 주문 목록 -> 나중에 /user-orders
ordersRouter.get('/user/order-list', verifyToken, ordersController.getUserOrders);

export default ordersRouter;
