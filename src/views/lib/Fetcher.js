import * as Api from '/lib/Api.js';

const version = 'v1';
const domain = `/api/${version}`;

// 모든 상품 조회
export async function getItemData() {
  return await Api.Get('http://localhost:3000', 'mock-products.json');
}

// Id별 상품 조회
export async function getItemById(itemId) {
  return await Api.Get(domain, `products?id=${itemId}`);
}

// 카테고리별 상품 조회
export async function getItemByCategory(category) {
  return await Api.Get(domain, `products/${category}`);
}

// 비밀번호 확인 요청
export async function postValidUser(data) {
  return await Api.Post(domain, `mypage/check-valid-user`, data);
}

// 유저 정보 조회
export async function getUserInfo() {
  return await Api.Get(domain, `auth/user-info`);
}

// 유저 정보 수정
export async function putUserInfo(data) {
  return await Api.Put(domain, `/mypage/edit-user-info`, data);
}

// 유저 로그인
export async function postSignin(data) {
  return await Api.Post(domain, `auth/signin`, data);
}

// 회원가입
export async function postSignup(data) {
  return await Api.Post(domain, `auth/signup`, data);
}

// 회원탈퇴
export async function deleteUserInfo() {
  return await Api.Delete(domain, `mypage/delete-user-info`);
}

// 비밀번호 초기화
export async function passwordReset(data) {
  return await Api.Put(domain, `auth/signin/password-reset`, data);
}

// 주문내역 조회
export async function getOrderList() {
  return await Api.Get(domain, `orders/user/order-list`);
}

// 주문내역 상세 조회
export async function getOrderInfo(orderId) {
  return await Api.Get(domain, `orders/${orderId}`);
}

// 주문 취소
export async function cancelOrder(orderId) {
  return await Api.Put(domain, `orders/cancel/${orderId}`);
}
