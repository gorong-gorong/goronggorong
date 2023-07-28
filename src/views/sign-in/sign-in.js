import { postSignin } from '../lib/Fetcher.js';

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
  const Token = await postSignin(data);
  localStorage.setItem('accessToken', Token.authorization.split(' ')[1]);
  const refreshToken = Token['x-refresh-token'];
  document.cookie = `refreshToken=${refreshToken}; path=/`;

  // 아이디 저장
  if (rememberCheck.checked) {
    localStorage.setItem('savedId', id.value.trim());
  } else {
    localStorage.removeItem('savedId');
  }

  window.location.href = '/';
};
signForm.addEventListener('submit', handleSubmit);
