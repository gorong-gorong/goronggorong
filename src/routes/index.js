import { Router } from 'express';
import authRouter from './auth-router';
import orderRouter from './order-router';
import productsRouter from './products-router';
import viewRouter from './view-router';

const router = Router();

router.use('/api/v1/auth', authRouter);

router.use('/api/v1', productsRouter);

router.use('/api/v1/orders', orderRouter);

// ViewRouter
router.use(viewRouter);

export default router;
