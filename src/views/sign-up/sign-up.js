import { postSignup } from '/lib/api/Fetcher.js';
import { formatAddress } from '/lib/utils/format-address.js';
import { redirectToMyPageIfLoggedIn } from '/lib/utils/redirect-by-login-status.js';

redirectToMyPageIfLoggedIn();

const signForm = document.querySelector('.sign__form');
const nameInput = document.querySelector('.form__name');
const idInput = document.querySelector('.form__id');
const passwordInput = document.querySelector('.form__pw');
const passwordCheckInput = document.querySelector('.form__pw-check');
const phoneInput = document.querySelector('.form__phone');

const handleSubmit = async (e) => {
  e.preventDefault();
  if (passwordInput.value !== passwordCheckInput.value) {
    alert('입력하신 비밀번호가 일치하지 않아요.\n다시 확인해주세요.');
    return;
  } else {
    const data = {
      name: nameInput.value,
      email: idInput.value,
      password: passwordInput.value,
      phone: phoneInput.value,
      address: formatAddress(),
    };
    await postSignup(data);
    alert('성공적으로 회원가입되었어요🎉\n로그인 페이지로 이동합니다.');
    //로그인페이지로 이동
    window.location.href = '/signin';
  }
};
signForm.addEventListener('submit', handleSubmit);
