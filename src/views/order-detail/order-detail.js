import { main } from '/layouts/main.js';
await main();

const _id = location.pathname.split('/')[2];
const userToken = localStorage.getItem('userToken');
const getOrderInfo = async (userToken) => {
  try {
    const res = await axios({
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      url: `/api/v1/orders/${_id}`,
    });

    return res.data.info;
  } catch (err) {
    alert(err);
  }
};

const { orderId, orderDate, deliveryStatus, paymentMethod, products, receiver, totalPrice } = await getOrderInfo(
  userToken,
);
const itemInfoWrap = document.querySelector('.item-info-wrap');

await products.forEach((item) => {
  itemInfoWrap.innerHTML += `<li class="item-info">
    <img class="item-img" src="${item.id.imgUrl}" alt="${
    item.id.name
  } 대표 이미지" onerror=" this.src='../../img/error.png' ;this.onerror=null;"/>
    <div>
      <span>제품명: ${item.id.name}</span>
      <span>수량: ${item.amount}</span>
      <span> 금액:${(item.id.price * item.amount).toLocaleString()}</span>
    </div>
  </li>`;
});
const orderIdEl = document.querySelector('.order-id');
orderIdEl.innerHTML = `주문번호: ${orderId}`;
const orderDateEl = document.querySelector('.order-date');
const orderStatusEl = document.querySelector('.order-status');
orderDateEl.innerHTML = `주문일자: ${orderDate.slice(0, 10)}`;
orderStatusEl.innerHTML = `주문상태: ${deliveryStatus}`;
const totalPriceNumber = document.querySelector('.total-price');
totalPriceNumber.innerHTML = totalPrice.toLocaleString();
const paymentType = document.querySelector('.payment-type');
paymentType.innerHTML = paymentMethod.paymentType === 'account' ? '무통장입금' : '카드';
const receiverName = document.querySelector('.receiver-name');
const receiverAddress = document.querySelector('.receiver-address');
const receiverPhone = document.querySelector('.receiver-phone');
const receiverRequest = document.querySelector('.receiver-request');
receiverName.innerHTML = receiver.name;
receiverAddress.innerHTML = receiver.address;
receiverPhone.innerHTML = receiver.phone;
receiverRequest.innerHTML = receiver.requestMessage;

const cancelOrder = document.querySelector('.cancel-order');
cancelOrder.addEventListener('click', (e) => {
  e.preventDefault();
  putCancel(userToken);
});

const putCancel = async (userToken) => {
  try {
    const res = axios({
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },

      url: `/api/v1/orders/cancel/${_id}`,
    });
    alert(res.data.message);
    window.location.href = '/mypage';
  } catch (err) {
    alert(err.message);
  }
};
