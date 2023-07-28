import * as Api from '/lib/api/Api.js';

const version = 'v1';
const domain = `/api/${version}`;

// PRODUCTS

// 모든 상품 조회
export async function getItemData(category, page, perPage) {
  return await Api.Get(domain, `products?category=${category}&page=${page}&perPage=${perPage}`);
}

// Id별 상품 조회
export async function getItemById(itemId) {
  return await Api.Get(domain, `products/${itemId}`);
}

// USERS

// 유저 정보 조회
export async function getUserInfo() {
  return await Api.Get(domain, `users`);
}

// 유저 정보 수정
export async function putUserInfo(data) {
  return await Api.Put(domain, `users`, data);
}

// 회원가입
export async function postSignup(data) {
  return await Api.Post(domain, `users`, data);
}

// 회원탈퇴
export async function deleteUserInfo() {
  return await Api.Delete(domain, `users`);
}

//AUTH

// 유저 로그인
export async function postSignin(data) {
  return await Api.Post(domain, `auth/signin`, data);
}

// 비밀번호 초기화
export async function passwordReset(data) {
  return await Api.Put(domain, `auth/signin/password-reset`, data);
}

// 비밀번호 확인 요청
export async function postValidUser(data) {
  return await Api.Post(domain, `auth/validation`, data);
}

// ORDERS

// 사용자별 주문내역 조회
export async function getOrderList() {
  return await Api.Get(domain, `orders`);
}

// 주문내역 상세 조회
export async function getOrderInfo(orderId) {
  return await Api.Get(domain, `orders/${orderId}`);
}

// 주문 취소
export async function cancelOrder(orderId) {
  return await Api.Put(domain, `orders/${orderId}/cancellation`);
}

// 결제
export async function postPayment(data) {
  return await Api.Post(domain, `orders/payment`, data);
}
