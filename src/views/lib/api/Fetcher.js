import api from '/lib/api/Api.js';

// PRODUCTS

// 모든 상품 조회
export async function getItemData(category, page, perPage) {
  return await api.get(`products?category=${category}&page=${page}&perPage=${perPage}`);
}

// Id별 상품 조회
export async function getItemById(itemId) {
  return await api.get(`products/${itemId}`);
}

// USERS

// 유저 정보 조회
export async function getUserInfo() {
  return await api.get(`users`);
}

// 유저 정보 수정
export async function putUserInfo(data) {
  return await api.put(`users`, data);
}

// 회원가입
export async function postSignup(data) {
  return await api.post(`users`, data);
}

// 회원탈퇴
export async function deleteUserInfo() {
  return await api.delete(`users`);
}

//AUTH

// 유저 로그인
export async function postSignin(data) {
  return await api.post(`auth/signin`, data);
}

// 비밀번호 초기화
export async function passwordReset(data) {
  return await api.put(`auth/signin/password-reset`, data);
}

// 비밀번호 확인 요청
export async function postValidUser(data) {
  return await api.post(`auth/validation`, data);
}

// ORDERS

// 사용자별 주문내역 조회
export async function getOrderList() {
  return await api.get(`orders`);
}

// 주문내역 상세 조회
export async function getOrderInfo(orderId) {
  return await api.get(`orders/${orderId}`);
}

// 주문 취소
export async function cancelOrder(orderId) {
  return await api.put(`orders/${orderId}/cancellation`);
}

// 결제
export async function postPayment(data) {
  return await api.post(`orders/payment`, data);
}
