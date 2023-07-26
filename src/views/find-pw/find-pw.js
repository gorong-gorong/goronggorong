import { passwordReset } from '/lib/Fetcher.js';

const userName = document.querySelector('.form__name');
const id = document.querySelector('.form__id');
const phone = document.querySelector('.form__phone');
const submitBtn = document.querySelector('.form__submit');

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {
    name: userName.value,
    email: id.value,
    phone: phone.value,
  };
  const newPassword = await passwordReset(data);
  modal.classList.add('is-active');
  newPw.value = newPassword.resetPassword;
};
submitBtn.addEventListener('click', handleSubmit);

// 모달관련 dom요소
const modal = document.querySelector('.modal');
const exitBtn = document.querySelector('.delete');
const copyBtn = document.querySelector('.modal-copy');
const signinBtn = document.querySelector('.modal-signin');
const newPw = document.querySelector('.new-pw--value');

//모달 관련 이벤트
const handleExitClick = () => {
  modal.classList.remove('is-active');
};

const handleCopyClick = async () => {
  const newPw = document.querySelector('.new-pw--value');

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(newPw.value);
      alert(`비밀번호가 복사되었습니다.
      로그인 후 비밀번호를 변경해주세요!`);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('비밀번호 복사에 실패했습니다.');
    }
  } else {
    //clipboard api를 지원하지 않는 브라우저의 경우 execCommand를 사용
    newPw.select();
    document.execCommand('copy');
    alert(`비밀번호가 복사되었습니다.
    로그인 후 비밀번호를 변경해주세요!`);
  }
};

const handleSigninClick = () => {
  window.location.href = '/signin';
};
exitBtn.addEventListener('click', handleExitClick);
copyBtn.addEventListener('click', handleCopyClick);
signinBtn.addEventListener('click', handleSigninClick);
