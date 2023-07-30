import { getToken } from '/lib/api/Token.js';

const { accessToken } = getToken();
const url = window.location;
const path = url.pathname + url.search;
const redirectUrl = path.slice(1);

function renderHeader() {
  const header = document.querySelector('header');

  //로그인 한 유저의 헤더
  if (accessToken) {
    header.innerHTML = `
  <nav class="nav">
  <div class="nave__space"></div>
    <a href="/"><img class="nav__logo" src="/img/logo.png" width="140" alt="고롱고롱 로고"/></a>

    <ul class="nav__user-menu">
      <li>
        <a class="nav__mypage" href="/mypage">마이페이지</a>
      </li>
      /
      <li>
        <a href="/orders/cart">장바구니</a>
      </li>
    </ul>
  </nav>
`;
  }
  //로그인 안 한 유저의 헤더
  else {
    header.innerHTML = `
      <nav class="nav">
      <div class="nave__space"></div>
        <a href="/">
          <img class="nav__logo" src="/img/logo.png" width="140" alt="고롱고롱 로고"/>
        </a>

        <ul class="nav__user-menu">
          <li>
            <a class="nav__signin" href="/signin/?redirect=${redirectUrl}">
              로그인
            </a>
          </li>
          /
          <li>
            <a class="nav__signup" href="/signup">
              회원가입
            </a>
          </li>
          /
          <li>
            <a class="nav__cart" href="/orders/cart">
              장바구니
            </a>
          </li>
        </ul>
      </nav>
    `;
  }
}

export { renderHeader };
