import { userModel, orderModel } from '../db/index.js';
import { customError } from '../middlewares/index.js';

const orderService = {
  createOrderId: () => {
    const now = new Date();
    let year = String(now.getFullYear());
    const month = String(now.getMonth() + 1);
    const date = String(now.getDate());
    if (month.length === 1) year += '0';
    let orderId = year + month + date;

    for (let i = 0; i < 10; i++) {
      orderId += Math.floor(Math.random() * 10);
    }

    return orderId;
  },
  createOrder: async (orderInfo) => {
    const checkUser = await userModel.findById(orderInfo.user);
    if (!checkUser) {
      throw new customError(400, '사용자가 없습니다.');
    }

    orderInfo.orderId = orderService.createOrderId();
    orderInfo.totalCase = orderInfo.products.length;
    if (orderInfo.paymentMethod.paymentType === 'card') {
      orderInfo.deliveryStatus = '결제완료';
    }

    const order = await orderModel.createOrder(orderInfo);
    if (!order) {
      throw new customError(400, '주문이 완료되지 않았습니다.');
    }

    return order;
  },
};

export default orderService;
