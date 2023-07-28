import { getUserInfo, getOrderList } from '/lib/Fetcher.js';
import { formatDate } from '/lib/utils/format-date.js';
import { formatPhoneNumber } from '/lib/utils/format-phone-number.js';
import { removeToken } from '/lib/Token.js';
import { main } from '/layouts/main.js';
await main();

// 회원정보
const userName = document.querySelector('.user__name');
const userGreeting = document.querySelector('.user__greeting');
const userDetail = document.querySelector('.user__detail');

const userData = await getUserInfo();
const { name, email, phone, address } = userData;

userGreeting.addEventListener('click', () => {
  userDetail.classList.toggle('user__detail-invisible');
});

userName.innerText = name;
userDetail.innerText = `${email}
${formatPhoneNumber(phone)}
${address}
`;
// 로그아웃 로직
const signout = document.querySelector('.user__signout');
const handleSignoutClick = () => {
  removeToken();
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
const ordersData = await getOrderList();
const orderList = ordersData.orderList;
const createOrderPreview = (order) => {
  const orderDate = formatDate(order.created_at);

  return `<li class="order__preview">
  <div class="preview__top">
  <p class="preview__top--date">${orderDate}</p>
  <p class="preview__top--orderid">주문번호: ${order.orderId}</p>
  </div>
  <div class="preview__info-container">
    <div class="preview__info-wrap">
      <img width="100px" class="preview__info--img" src="${order.productList[0].product.imgUrl}" alt="${
    order.productList[0].product.name
  } 대표 이미지" onerror="this.src='../img/error.png'" />
      <div class="preview__info">
      <p class="preview__state">${order.deliveryStatus}</p>
        <p class="preview__info--title">
          ${
            order.productList[0].product.name
          } <span class="preview__info--other">외 <strong class="preview__info--others">${
    order.totalCase - 1
  }</strong>건</span>
        </p>
        <p><strong class="preview__info--price">${order.totalPrice.toLocaleString()}</strong>원</p>
      </div>
    </div>
    <a class="preview__btn--detail" href="/orders/${order.orderId}">주문 상세</a>
  </div>
</li>
`;
};

// 상품 결제, 배송 상태
if (!orderList.length) {
  for (let i = 0; i < 6; i++) {
    status[i] = 0;
    state[i].innerText = '0';
  }
}

// 상품 주문 내역
const orderListElement = document.querySelector('.order');

if (orderList.length === 0) {
  orderListElement.innerHTML = `
  <li class="order__empty">
  <img src = '/img/empty-cart.png'>
  <p>아직 주문 내역이 없습니다.</p>
  </li>`;
} else {
  orderList.forEach((order) => {
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
    orderListElement.innerHTML += createOrderPreview(order);
  });
}
