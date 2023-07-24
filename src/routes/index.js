import { Router } from 'express';
import usersRouter from './users-router';
import authRouter from './auth-router';
import productsRouter from './products-router';
import ordersRouter from './orders-router';
import viewRouter from './view-router';

const router = Router();

router.use('api/v1/user', usersRouter);

router.use('/api/v1/auth', authRouter);

router.use('/api/v1/products', productsRouter);

router.use('/api/v1/orders', ordersRouter);

// ViewRouter
router.use(viewRouter);

export default router;
