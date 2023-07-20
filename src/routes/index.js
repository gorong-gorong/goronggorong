import { Router } from 'express';
import authRouter from './auth-router';
import ordersRouter from './orders-router';
import productsRouter from './products-router';
import viewRouter from './view-router';

const router = Router();

router.use('/api/v1/auth', authRouter);

router.use('/api/v1', productsRouter);

router.use('/api/v1/orders', ordersRouter);

// ViewRouter
router.use(viewRouter);

export default router;
