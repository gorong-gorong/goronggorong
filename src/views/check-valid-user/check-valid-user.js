const pw = document.querySelector('.form__pw');
const submit = document.querySelector('.form__submit');

const handleSubmit = (e) => {
  e.preventDefault();
  const userToken = localStorage.getItem('userToken');
  postValidUser(userToken);
};
submit.addEventListener('click', handleSubmit);

const postValidUser = async (userToken) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/api/v1/mypage/check-valid-user',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        password: pw.value,
      },
    });
    if (res.status === 200) {
      //회원정보수정 페이지로 이동
      window.location.href = '/mypage/edit-user-info';
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};
