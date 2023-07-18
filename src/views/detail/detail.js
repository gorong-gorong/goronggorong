import { main } from '/layouts/main.js';
await main();

const itemImgs = document.querySelectorAll('.item__img');
const names = document.querySelectorAll('.item__name');
const prices = document.querySelectorAll('.item__price');
const totalPrice = document.querySelector('.item__price--total');
const category = document.querySelector('.overview__category');
const description = document.querySelector('.overview__description');
const navAmount = document.querySelector('.bottom-nav__amount--count');
const navCartBtn = document.querySelector('.bottom-nav__btn--cart');

const url = window.location.search;
const itemId = url.split('=')[1];

// export const getItemById = async (itemId) => {
//   try {
//     const res = await axios({
//       method: 'get',
//       url: `/api/v1/products?id=${itemId}`,
//     });

//     return res.data.info;
//   } catch (err) {
//     alert(err.response.data.message);
//   }
// };
import { getItemById } from '/lib/api.js';
const item = await getItemById(itemId);
console.log('🚀 ~ file: detail.js:31 ~ item:', item);

itemImgs.forEach((itemImg) => {
  itemImg.setAttribute('src', item.imgUrl);
  itemImg.setAttribute('alt', `${item.name} 대표 이미지`);
  itemImg.onerror = () => {
    itemImg.onerror = null;
    itemImg.setAttribute('src', '../img/error.png');
    itemImg.style.border = '1px solid #e8e8e8';
  };
});

names.forEach((name) => (name.innerText = item.name));

prices.forEach((price) => (price.innerText = item.price.toLocaleString()));

category.innerText = item.category;
description.innerText = item.description;

totalPrice.innerHTML = item.price.toLocaleString();
navAmount.addEventListener('change', () => {
  totalPrice.innerHTML = (navAmount.value * item.price).toLocaleString();
});

let cartItem = [];
const addCart = () => {
  const newItem = {
    id: item._id,
    imgUrl: item.imgUrl,
    name: item.name,
    price: item.price.toLocaleString(),
    amount: navAmount.value,
  };
  //스토리지에 기존 아이템이 있는 경우
  if (localStorage.getItem('cart')) {
    cartItem = JSON.parse(localStorage.getItem('cart'));
    //cartItem에 이름이 같은 아이템이 있는지 찾기
    const existingItem = cartItem.find((item) => item.name === newItem.name);
    if (existingItem) {
      alert('기존에 장바구니에 추가 된 아이템입니다. 수량을 변경했어요😽');
      //새로운 수량입력값으로 변경
      existingItem.amount = navAmount.value;
    } else {
      cartItem.push(newItem);
      window.alert('장바구니에 아이템을 추가했습니다🐶');
    }
  }
  //기존 스토리지에 아이템이 없는 경우
  else {
    cartItem.push(newItem);
    window.alert('장바구니에 아이템을 추가했습니다🐶');
  }

  localStorage.setItem('cart', JSON.stringify(cartItem));
  //배열 초기화
  cartItem = [];
};
navCartBtn.addEventListener('click', addCart);
