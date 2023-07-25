import { StatusCodes } from 'http-status-codes';
import { userModel } from '../db';
import { customError } from '../middlewares';
import { bcryptUtils, jwtUtils, createRandomPassword } from '../utils';

const authService = {
  // 토큰 생성
  signToken: async function (user) {
    const refreshToken = jwtUtils.createToken(user);
    const updateResult = await userModel.updateUser(user.id, { refreshToken });

    if (!updateResult) {
      throw new customError(StatusCodes.BAD_REQUEST, '토큰을 업데이트 하는데 실패했습니다.');
    }

    return refreshToken;
  },

  // 비밀번호 초기화
  resetPassword: async function (user) {
    const resetPassword = createRandomPassword();
    const hashedPassword = await bcryptUtils.createHashPassword(resetPassword);
    await userModel.updateUser(user._id, { password: hashedPassword });

    return resetPassword;
  },

  // 유효한 사용자 확인 valid만
  checkUserStatus: async function (email, compareData = undefined) {
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
