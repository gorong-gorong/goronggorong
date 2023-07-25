import { Router } from 'express';
import usersRouter from './users-router';
import authRouter from './auth-router';
import productsRouter from './products-router';
import ordersRouter from './orders-router';
import viewsRouter from './views-router';

const router = Router();

// UsersRouter
router.use('/api/v1/users', usersRouter);

// AuthRouter
router.use('/api/v1/auth', authRouter);

// ProductsRouter
router.use('/api/v1/products', productsRouter);

// OrdersRouter
router.use('/api/v1/orders', ordersRouter);

// ViewRouter
router.use(viewsRouter);

export default router;
