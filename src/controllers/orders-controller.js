import { StatusCodes } from 'http-status-codes';
import { ordersService, usersService } from '../services';

const ordersController = {
  // get /orders
  getUserOrders: async function (req, res, next) {
    try {
      const userEmail = req.decoded.email;
      const { _id: userId } = await usersService.getUser(userEmail);
      const orderList = await ordersService.getUserOrders(userId);

      return res.status(StatusCodes.OK).json({
        message: '사용자의 주문 정보를 읽어왔습니다.',
        data: { orderList },
      });
    } catch (err) {
      next(err);
    }
  },

  // get /orders/:id
  getSelectedOrder: async function (req, res, next) {
    try {
      const orderId = req.params.id;
      const order = await ordersService.getSelectedOrder(orderId);

      return res.status(StatusCodes.OK).json({
        message: '주문 내역을 불러왔습니다.',
        data: { order },
      });
    } catch (err) {
      next(err);
    }
  },

  // get /orders/:_id/cancellation
  cancelSelectedOrder: async function (req, res, next) {
    try {
      const orderId = req.params.id;
      await ordersService.cancelSelectedOrder(orderId);

      return res.status(StatusCodes.OK).json({
        message: '주문이 취소됐습니다.',
      });
    } catch (err) {
      next(err);
    }
  },

  // post /orders/payment
  createOrder: async function (req, res, next) {
    try {
      const { receiver, productList, totalPrice, paymentMethod } = req.body;
      const userEmail = req.decoded.email;
      const { _id: userId } = await usersService.getUser(userEmail);
      const { orderId } = await ordersService.createOrder({
        receiver,
        productList,
        totalPrice,
        paymentMethod,
        user: userId,
      });

      return res.status(StatusCodes.OK).json({
        message: '주문을 완료했습니다.',
        data: { orderId },
      });
    } catch (err) {
      next(err);
    }
  },
};

export default ordersController;
