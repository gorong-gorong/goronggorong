import { Router } from 'express';
import path from 'path';
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

router.use(function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname, '../views/404/404.html'));
});

export default router;
