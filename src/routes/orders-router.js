import { Router } from 'express';
import { ordersController } from '../controllers';
import { verifyToken } from '../middlewares';

const ordersRouter = Router();

// 사용자별 주문 목록
ordersRouter.get('/', verifyToken, ordersController.getUserOrders);

// 주문 상세
ordersRouter.get('/:_id', verifyToken, ordersController.getSelectedOrder);

// 주문 취소
ordersRouter.put('/:_id/cancellation', verifyToken, ordersController.cancelSelectedOrder);

// 결제
ordersRouter.post('/payment', verifyToken, ordersController.createOrder);

export default ordersRouter;
