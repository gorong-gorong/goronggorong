import { Router } from 'express';
import authRouter from './auth-router';
import orderRouter from './order-router';
import productRouter from './product-router';
import viewRouter from './view-router';

const router = Router();

router.use('/api/v1/auth', authRouter);

router.use('/api/v1', productRouter);

router.use('/api/v1', orderRouter);

// ViewRouter
router.use(viewRouter);

export default router;
