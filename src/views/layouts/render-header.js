import { getToken } from '/lib/api/Token.js';

const { accessToken } = getToken();

function renderHeader() {
  const header = document.querySelector('header');

  //로그인 한 유저의 헤더
  if (accessToken) {
    header.innerHTML = `
  <nav class="nav">
    <a href="/"><img class="nav__logo" src="/img/logo.png" width="140" alt="고롱고롱 로고"/></a>

    <ul class="nav__user-menu">
      <li>
        <a class="nav__mypage" href="/mypage"><img class="icon" src="/img/profile.png" /></a>
      </li>
      <li>
        <a href="/orders/cart"><img class="icon" src="/img/cart.png" /></a>
      </li>
    </ul>
  </nav>
`;
  }
  //로그인 안 한 유저의 헤더
  else {
    header.innerHTML = `
      <nav class="nav">
        <a href="/">
          <img class="nav__logo" src="/img/logo.png" width="140" alt="고롱고롱 로고"/>
        </a>

        <ul class="nav__user-menu">
          <li>
            <a class="nav__signin" href="/signin">
              로그인
            </a>
          </li>
          <li>
            <a class="nav__signup" href="/signup">
              회원가입
            </a>
          </li>
          <li>
            <a href="/orders/cart">
              <img class="icon" src="/img/cart.png" />
            </a>
          </li>
        </ul>
      </nav>
    `;
  }
}

export { renderHeader };
