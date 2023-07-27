import { Router } from 'express';
import { ordersController } from '../controllers';
import { tokenHandler } from '../services';

const ordersRouter = Router();

// 사용자별 주문 목록
ordersRouter.get('/', tokenHandler.verifyAccessToken, ordersController.getUserOrders);

// 주문 상세
ordersRouter.get('/:id', tokenHandler.verifyAccessToken, ordersController.getSelectedOrder);

// 주문 취소
ordersRouter.put('/:id/cancellation', tokenHandler.verifyAccessToken, ordersController.cancelSelectedOrder);

// 결제
ordersRouter.post('/payment', tokenHandler.verifyAccessToken, ordersController.createOrder);

export default ordersRouter;
