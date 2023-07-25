const createOrderId = function () {
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
};

export { createOrderId };
