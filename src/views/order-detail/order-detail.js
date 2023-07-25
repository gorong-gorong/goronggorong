import { getOrderInfo, cancelOrder } from '/lib/Fetcher.js';
import { formatDate } from '/lib/utils/format-date.js';
import { main } from '/layouts/main.js';
await main();

const OrderId = location.pathname.split('/')[2];

const {
  orderId,
  orderDate: created_at,
  deliveryStatus,
  paymentMethod,
  products,
  receiver,
  totalPrice,
} = await getOrderInfo(OrderId);

const itemInfoWrap = document.querySelector('.item-info-wrap');

await products.forEach((product) => {
  itemInfoWrap.innerHTML += `<li class="item-info">
    <img class="item-img" src="${product.id.imgUrl}" alt="${
    product.id.name
  } 대표 이미지" onerror=" this.src='../../img/error.png' ;this.onerror=null;"/>
    <div>
      <span>제품명: ${product.id.name}</span>
      <span>수량: ${product.amount}</span>
      <span> 금액:${(product.id.price * product.amount).toLocaleString()}</span>
    </div>
  </li>`;
});
const orderIdEl = document.querySelector('.order-id');
orderIdEl.innerHTML = `주문번호: ${orderId}`;
const orderDateEl = document.querySelector('.order-date');
const orderStatusEl = document.querySelector('.order-status');
orderDateEl.innerHTML = `주문일자: ${formatDate(created_at)}`;
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

// 주문 취소하기
const cancelButton = document.querySelector('.cancel-order');

const handleCancelClick = async () => {
  if (window.confirm(`주문을 취소할까요?`)) {
    await cancelOrder(OrderId);
    window.location.href = '/mypage';
  }
};
cancelButton.addEventListener('click', handleCancelClick);
