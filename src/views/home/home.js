import { main } from '/layouts/main.js';
await main();

const amountAll = document.querySelector('.prod__item--amount');

const getItemData = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: `/api`,
    });

    const items = res.data.info;
    amountAll.innerText = items.length;
    const list = document.querySelector('.prod__list');

    items.forEach((item) => {
      const itemElement = createItem(item);
      list.appendChild(itemElement);
    });

    const category = document.querySelectorAll('.nav__cate li');
    category.forEach((cate) => {
      cate.addEventListener('click', (e) => {
        //기존 on카테고리에서 on클래스 삭제하고
        document.querySelector('.nav__cate--on').classList.remove('nav__cate--on');
        //클릭한 카테고리에 on 클래스 추가
        e.target.classList.add('nav__cate--on');
      });
    });
  } catch (err) {
    alert(err.response.data.message);
  }
};

getItemData();

//item 리스트 컴포넌트 만들기
const createItem = (item) => {
  const itemElement = document.createElement('li');
  itemElement.classList.add('prod__item');

  const link = document.createElement('a');
  link.classList.add('prod__link');
  link.setAttribute('href', `/products?id=${item.id}`);

  const thumb = document.createElement('img');
  thumb.classList.add('prod__link-thumb');
  thumb.setAttribute('src', item.imgUrl);
  thumb.setAttribute('alt', `${item.name} 대표 이미지`);

  const info = document.createElement('div');
  info.classList.add('prod__info');

  const title = document.createElement('p');
  title.classList.add('prod__title');
  title.innerText = item.name;

  const order = document.createElement('div');
  order.classList.add('prod__order');

  const price = document.createElement('span');
  price.innerHTML = `<strong class="prod__order-price">${item.price}</strong>원`;

  order.appendChild(price);
  info.appendChild(title);
  info.appendChild(order);
  link.appendChild(thumb);
  link.appendChild(info);
  itemElement.appendChild(link);

  return itemElement;
};

//카테고리별 아이템 렌더링
const categories = document.querySelectorAll('.nav__cate li');

categories.forEach((category) => {
  const renderProducts = (e) => {
    //기존 on카테고리에서 on클래스 삭제하고
    document.querySelector('.nav__cate--on').classList.remove('nav__cate--on');
    //클릭한 카테고리에 on 클래스 추가
    e.target.classList.add('nav__cate--on');
    const selectedCategory = category.dataset.category;
    if (selectedCategory === 'All') {
      window.location.href = '/';
      return;
    } else {
      getCategoryItem(selectedCategory);
    }
  };
  category.addEventListener('click', renderProducts);
});

const getCategoryItem = async (selectedCategory) => {
  try {
    const res = await axios({
      method: 'get',
      url: `/api/products/${selectedCategory}`,
    });

    const items = res.data.info;
    amountAll.innerText = items.length;
    const list = document.querySelector('.prod__list');
    list.innerHTML = ''; //기존 상품 목록 초기화
    items.forEach((item) => {
      const itemElement = createItem(item);
      list.appendChild(itemElement);
    });

    // URL 변경 코드
    const currentUrl = window.location.href;
    // /products/뒤에오는 문자열 찾기-> 카테고리명으로 변경하기
    const newUrl = currentUrl.replace(/\/products\/(.*)\/?/, `/products/${selectedCategory}`);
    // 브라우저 히스토리에 새 url추가
    window.history.pushState({ path: newUrl }, '', newUrl);
  } catch (err) {
    alert(err);
  }
};
