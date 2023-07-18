import { Router } from 'express';
import userRouter from './user-router';
import orderRouter from './order-router';
import productRouter from './product-router';
import authRouter from './auth-router';
import viewRouter from './view-router';

const router = Router();

// API
router.use('/api/v1/auth', authRouter);

router.use('/api/v1', userRouter);

router.use('/api/v1', productRouter);

router.use('/api/v1', orderRouter);

// ViewRouter
router.use(viewRouter);

export default router;
