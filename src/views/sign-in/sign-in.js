import { postSignin } from '/lib/api/Fetcher.js';
import { setToken } from '/lib/api/Token.js';
import { redirectToMyPageIfLoggedIn } from '/lib/utils/redirect-by-login-status.js';

redirectToMyPageIfLoggedIn();

const signForm = document.querySelector('.sign__form');
const idInput = document.querySelector('.form__id');
const passwordInput = document.querySelector('.form__pw');
const rememberCheck = document.querySelector('.form__remember--input');
const savedId = localStorage.getItem('savedId');

// 브라우저에 저장된 아이디가 있으면 디폴트값 설정
if (savedId) {
  rememberCheck.checked = true;
  idInput.value = savedId;
}

// 로그인 요청
const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {
    email: idInput.value.trim(),
    password: passwordInput.value.trim(),
  };
  // 로그인 요청 후 응답 헤더로 받은 토큰을 브라우저에 저장
  const responseHeaders = await postSignin(data);
  setToken(responseHeaders);

  // 아이디 저장
  if (rememberCheck.checked) {
    localStorage.setItem('savedId', idInput.value.trim());
  } else {
    localStorage.removeItem('savedId');
  }
  // 로그인 완료 후 이전페이지로 리다이렉트
  window.history.go(-1);
};
signForm.addEventListener('submit', handleSubmit);
