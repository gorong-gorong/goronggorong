const passwordUtils = {
  // 랜덤 비밀번호 생성
  createRandomPassword: function () {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';

    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
  },
};

export default passwordUtils;
