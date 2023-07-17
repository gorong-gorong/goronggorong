import { main } from '/layouts/main.js';
await main();

//전체 상품 목록 불러오기
const amountAll = document.querySelector('.prod__item--amount');

const getItemData = async () => {
  try {
    const res = await axios.get('/api');

    const items = res.data.info;
    amountAll.innerText = items.length;
    const list = document.querySelector('.prod__list');
    items.forEach((item) => {
      list.innerHTML += createItem(item);
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

//상품상세 불러오기
const createItem = (item) => {
  return `
  <li class="prod__item">
            <a class="prod__link" href="/products?id=${item.id}">
              <img
                class="prod__link-thumb"
                src="${item.imgUrl}"
                alt="${item.name} 대표 이미지"
              />
              <div class="prod__info">
                <p class="prod__title">${item.name}</p>
                <div class="prod__order">
                  <span><strong class="prod__order-price">${item.price.toLocaleString()}</strong>원</span>
                </div>
              </div>
            </a>
          </li>`;
};

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
      axios
        .get(`/api/products/${selectedCategory}`)
        .then((res) => {
          const items = res.data.info;
          amountAll.innerText = items.length;
          const list = document.querySelector('.prod__list');
          list.innerHTML = ''; //기존 상품 목록 초기화
          items.forEach((item) => {
            list.innerHTML += createItem(item);
          });

          // URL 변경 코드
          const currentUrl = window.location.href;
          // /products/뒤에오는 문자열 찾기-> 카테고리명으로 변경하기
          const newUrl = currentUrl.replace(/\/products\/(.*)\/?/, `/products/${selectedCategory}`);
          // 브라우저 히스토리에 새 url추가
          window.history.pushState({ path: newUrl }, '', newUrl);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  category.addEventListener('click', renderProducts);
});
