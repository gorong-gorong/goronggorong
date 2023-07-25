import { ObjectId } from 'mongodb';

// YYYYMMDD + ObjectId(Incrementing Counter, 3-byte)
const createOrderId = function () {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const counter = new ObjectId().toString('hex').slice(-6);
  const orderId = year + month + date + counter;

  return orderId;
};

export { createOrderId };
