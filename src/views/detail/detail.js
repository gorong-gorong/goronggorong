import { main } from '/layouts/main.js';
await main();

const url = window.location.search;
const itemId = url.split('=')[1];

axios({
  method: 'get',
  url: `/api/products?id=${itemId}`,
})
  .then((res) => {
    const item = res.data.info;

    const itemImg = document.querySelectorAll('.item__img');
    const name = document.querySelectorAll('.item__name');
    const price = document.querySelectorAll('.item__price');
    const category = document.querySelector('.overview__category');
    const description = document.querySelector('.overview__description');
    const navAmount = document.querySelector('.bottom-nav__amount--count');
    const navCartBtn = document.querySelector('.bottom-nav__btn--cart');

    itemImg.forEach((data) => data.setAttribute('src', item.imgUrl));

    name.forEach((data) => (data.innerText = item.name));

    price.forEach((data) => (data.innerText = item.price.toLocaleString()));

    category.innerText = item.category;
    description.innerText = item.description;

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
  })
  .catch((err) => {
    alert(err.response.data.message);
  });
