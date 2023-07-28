import { StatusCodes } from 'http-status-codes';
import { userModel } from '../db';
import { customError } from '../middlewares';
import { bcryptUtils, createRandomPassword } from '../utils';

const authService = {
  // 비밀번호 초기화
  resetPassword: async function (userEmail) {
    const resetPassword = createRandomPassword();
    const hashedPassword = await bcryptUtils.createHashPassword(resetPassword);
    await userModel.updateUser(userEmail, { password: hashedPassword });

    return resetPassword;
  },

  // 유효한 사용자 확인 valid만
  checkUserValidation: async function (email, compareData = undefined) {
    const user = await userModel.findByEmail(email);

    if (!user) {
      throw new customError(StatusCodes.NOT_FOUND, '사용자가 없습니다.');
    } else if (compareData) {
      if (user.name !== compareData.name || user.phone !== compareData.phone) {
        throw new customError(StatusCodes.NOT_FOUND, '사용자가 없습니다.');
      }
    }

    return user;
  },

  // 비밀번호 확인
  verifyPassword: async function (inputPassword, original) {
    const result = await bcryptUtils.verifyPassword(inputPassword, original);

    if (!result) {
      throw new customError(StatusCodes.BAD_REQUEST, '잘못된 비밀번호입니다.');
    }
  },
};

export default authService;
