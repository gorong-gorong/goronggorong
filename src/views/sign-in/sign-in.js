import { postSignin } from '../lib/Fetcher.js';
import { setToken } from '../lib/Token.js';

const signForm = document.querySelector('.sign__form');
const id = document.querySelector('.form__id');
const pw = document.querySelector('.form__pw');
const rememberCheck = document.querySelector('.form__remember--input');
const savedId = localStorage.getItem('savedId');
if (savedId) {
  rememberCheck.checked = true;
  id.value = savedId;
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {
    email: id.value.trim(),
    password: pw.value.trim(),
  };
  // 로그인 요청 후 응답 헤더로 받은 토큰을 브라우저에 저장
  const responseHeaders = await postSignin(data);
  setToken(responseHeaders);

  // 아이디 저장
  if (rememberCheck.checked) {
    localStorage.setItem('savedId', id.value.trim());
  } else {
    localStorage.removeItem('savedId');
  }

  window.location.href = '/';
};
signForm.addEventListener('submit', handleSubmit);
