import { orderModel } from '../db/index.js';
import { customError } from '../middlewares/index.js';
import { orderService } from '../services/index.js';

const orderController = {
  createOrder: async (req, res, next) => {
    const { receiver, products, totalPrice, paymentMethod } = req.body;

    try {
      if (!receiver || !products || !totalPrice || !paymentMethod) {
        throw new customError(400, '누락된 데이터가 있습니다.');
      }

      const order = await orderService.createOrder({ ...req.body, user: req.decoded._id });

      return res.status(200).json({
        message: '주문을 완료했습니다',
        info: order,
      });
    } catch (err) {
      next(err);
    }
  },
  getSelectedOrder: async (req, res, next) => {
    const { _id } = req.params;

    try {
      if (!_id) {
        throw new customError(400, '누락된 데이터가 있습니다.');
      }

      const order = await orderModel.findOneById(_id);
      if (!order) {
        throw new customError(400, '주문 정보가 없습니다.');
      }

      return res.status(200).json({
        message: '주문 정보를 불러왔습니다.',
        info: order,
      });
    } catch (err) {
      next(err);
    }
  },
  cancelSelectedOrder: async (req, res, next) => {
    // 주문 취소로 바꿔주기
    const { _id } = req.params;

    try {
      if (!_id) {
        throw new customError(400, '누락된 데이터가 있습니다.');
      }

      const updatedOrder = await orderModel.updateOrder(_id);

      return res.status(200).json({
        message: '주문이 취소됐습니다.',
        info: updatedOrder,
      });
    } catch (err) {
      next(err);
    }
  },
  getUserOrders: async (req, res, next) => {
    const { _id } = req.decoded;

    try {
      if (!_id) {
        throw new customError(400, '누락된 데이터가 있습니다.');
      }

      const orders = await orderModel.findAllById(_id);

      return res.status(200).json({
        message: '사용자의 주문 정보를 읽어왔습니다.',
        info: orders,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default orderController;
