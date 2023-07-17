import { Router } from 'express';
import userRouter from './user-router.js';
import orderRouter from './order-router.js';
import productRouter from './product-router.js';
import authRouter from './auth-router.js';
import viewRouter from './view-router.js';

const router = Router();

// API
router.use('/api/v1', userRouter);
router.use('/api/v1', productRouter);
router.use('/api/v1', orderRouter);
router.use('/api/v1', authRouter);

// ViewRouter
router.use(viewRouter);

export default router;
