import { Order } from '../schemas/index.js';

const orderModel = {
  findOneById: async (_id) => {
    const order = await Order.findOne({ _id }).populate('user', 'name email').populate('products.id');

    return order;
  },
  findAllById: async (_id) => {
    const orders = await Order.find({ user: _id })
      .sort({ _id: -1 })
      .populate('user', 'name email')
      .populate('products.id');

    return orders;
  },
  createOrder: async (orderInfo) => {
    const order = await Order.create(orderInfo);

    return order;
  },
  updateOrder: async (_id) => {
    const updatedOrder = await Order.updateOne({ _id }, { deliveryStatus: '주문취소' });

    return updatedOrder;
  },
};

export default orderModel;
