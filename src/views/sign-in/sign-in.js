import { postSignin } from '../lib/Fetcher.js';

const id = document.querySelector('.form__id');
const pw = document.querySelector('.form__pw');
const submitBtn = document.querySelector('.form__submit');
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
  const userToken = await postSignin(data);
  localStorage.setItem('userToken', userToken);

  // 아이디 저장
  if (rememberCheck.checked) {
    localStorage.setItem('savedId', id.value.trim());
  } else {
    localStorage.removeItem('savedId');
  }

  window.location.href = '/';
};
submitBtn.addEventListener('click', handleSubmit);
