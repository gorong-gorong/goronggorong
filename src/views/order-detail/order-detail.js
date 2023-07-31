import { getOrderInfo, cancelOrder } from '/lib/api/Fetcher.js';
import { formatDate } from '/lib/utils/format-date.js';
import { main } from '/layouts/main.js';
await main();
import { redirectToSignInIfLoggedOut } from '/lib/utils/redirect-by-login-status.js';

redirectToSignInIfLoggedOut();

const OrderId = location.pathname.split('/')[2];

const orderData = await getOrderInfo(OrderId);
const { orderId, created_at, deliveryStatus, paymentMethod, productList, receiver, totalPrice } = orderData.order;

const itemInfoWrap = document.querySelector('.item-info-wrap');

await productList.forEach((product) => {
  itemInfoWrap.innerHTML += `<li class="item-info">
    <img class="item-info-img" src="${product.product.imgUrl}" alt="${
    product.product.name
  } 대표 이미지" onerror=" this.src='../../img/error.png' ;this.onerror=null;"/>
    <div class='item-info-data'>
      <span class='item-info-name'>${product.product.name}</span>
      <span class='item-info-amount'>${product.amount}개</span>
      <span class='item-info-price'> 총 ${(product.product.price * product.amount).toLocaleString()}원</span>
    </div>
  </li>`;
});
const orderIdEl = document.querySelector('.order-id');
orderIdEl.innerHTML = `<span class='item-status-title'>주문번호</span> ${orderId}`;
const orderDateEl = document.querySelector('.order-date');
const orderStatusEl = document.querySelector('.order-status');
orderDateEl.innerHTML = `<span class='item-status-title'>주문일자</span> ${formatDate(created_at)}`;
orderStatusEl.innerHTML = `<span class='item-status-title'>주문상태</span> ${deliveryStatus}`;
const totalPriceNumber = document.querySelector('.total-price');
totalPriceNumber.innerHTML = `${totalPrice.toLocaleString()} 원`;
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
if (deliveryStatus === '주문취소' || deliveryStatus === '배송중' || deliveryStatus === '배송완료') {
  cancelButton.disabled = true;
}

const handleCancelClick = async () => {
  if (window.confirm('주문을 취소할까요?')) {
    await cancelOrder(OrderId);
    alert('주문을 취소했어요.');
    window.location.href = '/mypage';
  }
};
cancelButton.addEventListener('click', handleCancelClick);
