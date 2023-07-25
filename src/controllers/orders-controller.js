import { StatusCodes } from 'http-status-codes';
import { ordersService } from '../services';

const ordersController = {
  // get /orders
  getUserOrders: async function (req, res, next) {
    try {
      const { _id } = req.decoded;
      const orders = await ordersService.getUserOrders(_id);

      return res.status(StatusCodes.OK).json({
        message: '사용자의 주문 정보를 읽어왔습니다.',
        data: { orders },
      });
    } catch (err) {
      next(err);
    }
  },

  // get /orders/:id
  getSelectedOrder: async function (req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      const order = await ordersService.getSelectedOrder(id);

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
      const { id } = req.params;
      await ordersService.cancelSelectedOrder(id);

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
      const { receiver, products, totalPrice, paymentMethod } = req.body;
      const user = req.decoded._id;
      const order = await ordersService.createOrder({ receiver, products, totalPrice, paymentMethod, user });

      return res.status(StatusCodes.OK).json({
        message: '주문을 완료했습니다.',
        data: { order },
      });
    } catch (err) {
      next(err);
    }
  },
};

export default ordersController;
