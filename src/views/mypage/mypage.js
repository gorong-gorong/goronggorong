import { getUserInfo, getOrderList } from '/lib/Fetcher.js';
import { getDate } from '/lib/utils/get-date.js';
import { main } from '/layouts/main.js';
await main();

// 회원정보
const userInfo = await getUserInfo();
const username = document.querySelector('.user__name');
username.innerText = userInfo.name;

// 로그아웃 로직
const signout = document.querySelector('.user__signout');
const handleSignoutClick = () => {
  localStorage.removeItem('userToken');
  alert('로그아웃 되었습니다.');
};
signout.addEventListener('click', handleSignoutClick);

// 배송 status 로직
const state1 = document.querySelector('.state__1');
const state2 = document.querySelector('.state__2');
const state3 = document.querySelector('.state__3');
const state4 = document.querySelector('.state__4');
const state5 = document.querySelector('.state__5');
const state6 = document.querySelector('.state__6');
const state = [state1, state2, state3, state4, state5, state6];
let status = [0, 0, 0, 0, 0, 0];

// 주문 내역
const orders = await getOrderList();

const createOrderPreview = (order) => {
  const orderDate = getDate(order.orderDate);

  return `<li class="order__preview">
  <div class="preview__top">
  <p class="preview__top--date">${orderDate}</p>
  <p class="preview__top--orderid">주문번호: ${order.orderId}</p>
  </div>
  <div class="preview__info-container">
    <div class="preview__info-wrap">
      <img width="100px" class="preview__info--img" src="${order.products[0].id.imgUrl}" alt="${
    order.products[0].id.name
  } 대표 이미지" onerror="this.src='../img/error.png'" />
      <div class="preview__info">
      <p class="preview__state">${order.deliveryStatus}</p>
        <p class="preview__info--title">
          ${order.products[0].id.name} <span class="preview__info--other">외 <strong class="preview__info--others">${
    order.totalCase - 1
  }</strong>건</span>
        </p>
        <p><strong class="preview__info--price">${order.totalPrice.toLocaleString()}</strong>원</p>
      </div>
    </div>
    <a class="preview__btn--detail" href="/orders/${order._id}">주문 상세</a>
  </div>
</li>
`;
};

// 상품 결제, 배송 상태
if (!orders.length) {
  for (let i = 0; i < 6; i++) {
    status[i] = 0;
    state[i].innerText = '0';
  }
}

// 상품 주문 내역
const orderList = document.querySelector('.order');

if (orders.length === 0) {
  orderList.innerHTML = `
  <li class="order__empty">
  <img src = '/img/empty-cart.png'>
  <p>아직 주문 내역이 없습니다.</p>
  </li>`;
} else {
  orders.forEach((order) => {
    //배송 상태
    if (order.deliveryStatus === '입금대기') {
      status[0] += 1;
    }
    if (order.deliveryStatus === '결제완료') {
      status[1] += 1;
    }
    if (order.deliveryStatus === '배송준비중') {
      status[2] += 1;
    }
    if (order.deliveryStatus === '배송중') {
      status[3] += 1;
    }
    if (order.deliveryStatus === '배송완료') {
      status[4] += 1;
    }
    if (order.deliveryStatus === '주문취소') {
      status[5] += 1;
    }
    for (let i = 0; i < 6; i++) {
      state[i].innerText = status[i];
    }
    //order preview 생성
    orderList.innerHTML += createOrderPreview(order);
  });
}
