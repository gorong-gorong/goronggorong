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
