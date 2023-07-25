import { Order } from '../schemas';

const orderModel = {
  // 주문 상세 내역 검색
  findOneById: async function (orderId) {
    const order = await Order.findOne({ _id: orderId }).populate('user', 'name email').populate('products.id');

    return order;
  },

  // 사용자별 주문 내역 검색
  findAllById: async function (userId) {
    const orders = await Order.find({ user: userId })
      .sort({ _id: -1 })
      .populate('user', 'name email')
      .populate('products.id');

    return orders;
  },

  // 주문 생성
  createOrder: async function (orderInfo) {
    const order = await Order.create(orderInfo);

    return order;
  },

  // 주문 수정
  updateOrder: async function (orderId) {
    const updatedOrder = await Order.updateOne({ _id: orderId }, { deliveryStatus: '주문취소' });

    return updatedOrder;
  },
};

export default orderModel;
