import { StatusCodes } from 'http-status-codes';
import { orderModel } from '../db';
import { customError } from '../middlewares';
import { createOrderId } from '../utils';

const ordersService = {
  // 주문 생성
  createOrder: async function (orderInfo) {
    orderInfo.orderId = createOrderId();
    orderInfo.totalCase = orderInfo.productList.length;
    if (orderInfo.paymentMethod.paymentType === 'card') {
      orderInfo.deliveryStatus = '결제완료';
    }

    const order = await orderModel.createOrder(orderInfo);
    if (!order) {
      throw new customError(StatusCodes.BAD_REQUEST, '주문을 실패했습니다.');
    }

    return order;
  },

  // 사용자 주문 내역
  getUserOrders: async function (userId) {
    const orders = await orderModel.findAllById(userId);

    return orders;
  },

  // 주문 상세 내역
  getSelectedOrder: async function (orderId) {
    const orders = await orderModel.findOneById(orderId);

    if (!orders) {
      throw new customError(StatusCodes.NOT_FOUND, '주문 내역을 찾지 못했습니다.');
    }

    return orders;
  },

  // 주문 취소
  cancelSelectedOrder: async function (orderId) {
    const cancelResult = await orderModel.updateOrder(orderId);

    if (!cancelResult) {
      throw new customError(StatusCodes.BAD_REQUEST, '주문 취소를 실패했습니다.');
    }
  },
};

export default ordersService;
