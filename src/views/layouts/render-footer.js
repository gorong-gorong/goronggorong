function renderFooter() {
  const footer = document.querySelector('footer');
  footer.innerHTML = `
  <div class="footer-container">
    <div class="footer__brand">
      <a href="/">
        <img src="/img/logo_simple.png" alt="고롱고롱 로고" width="120px" />
      </a>
      <p><strong>고롱고롱</strong></p>
      <p>우리 댕댕이, 우리 야옹이 용품 쉽게, 빠르게!</p>
      <p>고롱고롱은 초보 집사님도 쉽게 주인님 용품을 구매할 수 있는 온라인 쇼핑몰입니다.</p>
      <p>TEAM GorongGorong ฅ^•ﻌ•^ฅ</p>
      <p>©2023 Elice Engineer Track SW4</p>
    </div>
    <div class="footer__bank">
      <h1>BANK INFO</h1>
      <p><strong>카카오뱅크</strong> 3333-1234-567890</p>
      <p><strong>예금주</strong> 주식회사 고롱고롱</p>
    </div>
    <div class="footer__to-top">
      <a href="#">
        <img src="/img/top.png" />
      </a>
    </div>
  </div>
  `;
}

export { renderFooter };
