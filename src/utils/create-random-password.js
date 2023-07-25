// 랜덤 비밀번호 생성
const createRandomPassword = function () {
  const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';

  for (let i = 0; i < 10; i++) {
    password += character.charAt(Math.floor(Math.random() * character.length));
  }

  return password;
};

export { createRandomPassword };
