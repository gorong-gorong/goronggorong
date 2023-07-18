import * as Api from './Api.js';

const version = 'v1';
const domain = `http://localhost:3000/api/${version}`;

// 모든 상품 조회
export async function getItemData() {
  return await Api.Get(domain);
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
  return await Api.Get(domain, `auth/get-user-info`);
}

// 유저 로그인
export async function postSignin(data) {
  return await Api.Post(domain, `auth/signin`, data);
}
