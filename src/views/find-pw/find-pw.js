const userName = document.querySelector('.form__name');
const id = document.querySelector('.form__id');
const phone = document.querySelector('.form__phone');
const submitBtn = document.querySelector('.form__submit');
// 모달관련 dom요소
const modal = document.querySelector('.modal');
const exitBtn = document.querySelector('.delete');
const copyBtn = document.querySelector('.modal-copy');
const signinBtn = document.querySelector('.modal-signin');
const newPw = document.querySelector('.new-pw--value');

const handleSubmit = (e) => {
  e.preventDefault();
  axios
    .put('/api/signin/find-password', {
      name: userName.value,
      email: id.value,
      phone: phone.value,
    })
    .then((res) => {
      if (res.status === 200) {
        modal.classList.add('is-active');
        newPw.value = res.data.info;
      }
      if (res.status === 400) {
        alert(res.data.message);
      }
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};
submitBtn.addEventListener('click', handleSubmit);

//모달 관련 이벤트
const handleExitClick = () => {
  modal.classList.remove('is-active');
};
const handleCopyClick = () => {
  navigator.clipboard.writeText(newPw.value);
};
const handleSigninClick = () => {
  window.location.href = '/signin';
};
exitBtn.addEventListener('click', handleExitClick);
copyBtn.addEventListener('click', handleCopyClick);
signinBtn.addEventListener('click', handleSigninClick);
