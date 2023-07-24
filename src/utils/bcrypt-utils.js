import bcrypt from 'bcrypt';

const bcryptUtils = {
  // 해시된 비밀번호 생성
  createHashPassword: async function (password) {
    const salt = 12;
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  },

  // 비밀번호 확인
  verifyPassword: async function (password, original) {
    const result = await bcrypt.compare(password, original);

    return result;
  },
};

export default bcryptUtils;
