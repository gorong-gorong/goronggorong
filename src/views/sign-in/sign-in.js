const id = document.querySelector('.form__id');
const pw = document.querySelector('.form__pw');
const submitBtn = document.querySelector('.form__submit');

const handleSubmit = (e) => {
  e.preventDefault();
  postSignin();
};
submitBtn.addEventListener('click', handleSubmit);

const postSignin = async () => {
  try {
    const res = await axios({
      method: 'post',
      url: '/api/signin',
      data: {
        email: id.value.trim(),
        password: pw.value.trim(),
      },
    });

    if (res.status === 200) {
      localStorage.setItem('userToken', res.data.token);
    }
    window.location.href = '/';
  } catch (err) {
    alert(err.response.data.message);
  }
};
