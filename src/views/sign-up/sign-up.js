const userName = document.querySelector('.form__name');
const id = document.querySelector('.form__id');
const pw = document.querySelector('.form__pw');
const pwCheck = document.querySelector('.form__pw-check');
const phone = document.querySelector('.form__phone');
const addressWrap = document.querySelector('.change-delivery-address');
const address = () => {
  return [...addressWrap.children]
    .filter((item) => item.tagName === 'INPUT')
    .map((item) => item.value)
    .join(' ');
};
const submitBtn = document.querySelector('.form__submit');

const handleSubmit = (e) => {
  e.preventDefault();
  if (pw.value !== pwCheck.value) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  } else {
    axios({
      method: 'post',
      url: '/api/signup',
      data: {
        name: userName.value,
        email: id.value,
        password: pw.value,
        phone: phone.value,
        address: address(),
      },
    })
      .then((res) => {
        if (res.status === 201) {
          alert(`
        성공적으로 회원가입되었어요🎉
        로그인 페이지로 이동합니다.`);
          //로그인페이지로 이동
          window.location.href = '/signin';
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }
};
submitBtn.addEventListener('click', handleSubmit);
