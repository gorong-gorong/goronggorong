import { postValidUser } from '/lib/api/Fetcher.js';
import { redirectToSignInIfLoggedOut } from '/lib/utils/redirect-by-login-status.js';

redirectToSignInIfLoggedOut();

const signForm = document.querySelector('.sign__form');
const passwordInput = document.querySelector('.form__password');

const url = window.location.search;
const redirectUrl = url.split('=')[1];

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {
    password: passwordInput.value,
  };

  await postValidUser(data);
  window.location.href = `/mypage/${redirectUrl}`;
};
signForm.addEventListener('submit', handleSubmit);
