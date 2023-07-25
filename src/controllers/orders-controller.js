import { StatusCodes } from 'http-status-codes';
import { orderModel } from '../db';
import { customError } from '../middlewares';
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

  // get /orders/:_id
  getSelectedOrder: async function (req, res, next) {
    try {
      const { _id } = req.params;
      const order = await ordersService.getSelectedOrder(_id);

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
    // 주문 취소로 바꿔주기
    const { _id } = req.params;

    try {
      if (!_id) {
        throw new customError(400, '누락된 데이터가 있습니다.');
      }

      const updatedOrder = await orderModel.updateOrder(_id);

      return res.status(200).json({
        message: '주문이 취소됐습니다.',
        data: updatedOrder,
      });
    } catch (err) {
      next(err);
    }
  },

  // post /orders/payment
  createOrder: async function (req, res, next) {
    const { receiver, products, totalPrice, paymentMethod } = req.body;

    try {
      if (!receiver || !products || !totalPrice || !paymentMethod) {
        throw new customError(400, '누락된 데이터가 있습니다.');
      }

      const order = await ordersService.createOrder({ ...req.body, user: req.decoded._id });

      return res.status(200).json({
        message: '주문을 완료했습니다',
        data: order,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default ordersController;
