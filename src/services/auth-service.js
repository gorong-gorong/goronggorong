import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { userModel } from '../db';
import { customError } from '../middlewares';

const authService = {
  // 토큰 생성
  signToken: async (user) => {
    const newToken = jwt.sign(
      {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.SECRET_KEY,
      {
        issuer: process.env.ISSUER,
      },
    );

    const updateResult = await userModel.updateUser(user.id, { refreshToken: newToken });
    if (!updateResult) {
      throw new customError(StatusCodes.BAD_REQUEST, '토큰을 업데이트 하는데 실패했습니다.');
    }

    return newToken;
  },

  // 비밀번호 확인
  verifyPassword: async (password, original) => {
    const result = await bcrypt.compare(password, original);

    if (result === false) {
      throw new customError(StatusCodes.BAD_REQUEST, '비밀번호가 틀렸습니다');
    }

    return result;
  },

  // 랜덤 비밀번호 생성
  createRandomPassword: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
  },

  // 토큰 Decoding
  decodeToken: (authHeader) => {
    const token = authHeader ? authHeader.replace('Bearer ', '') : null;
    if (!token) {
      throw new customError(StatusCodes.NOT_FOUND, '토큰이 없습니다.');
    }

    const decodedInfo = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedInfo) {
      throw new customError(StatusCodes.BAD_REQUEST, '잘못된 토큰입니다.');
    }

    return decodedInfo;
  },

  // 비밀번호 초기화
  resetPassword: async (user) => {
    const resetPassword = authService.createRandomPassword();
    const hashedPassword = await authService.createHashPassword(resetPassword);
    await userModel.updateUser(user._id, { password: hashedPassword });

    return resetPassword;
  },

  // 유효한 사용자 확인 valid만
  checkUserStatus: async (email, flag, compareData = undefined) => {
    const user = await userModel.findByEmail(email);

    if (flag === 'overlap' && user) {
      throw new customError(StatusCodes.BAD_REQUEST, '사용자가 이미 있습니다');
    }
    if (flag === 'valid' && !user) {
      throw new customError(StatusCodes.NOT_FOUND, '사용자가 없습니다.');
    } else if (flag === 'valid' && compareData) {
      if (user.name !== compareData.name || user.phone !== compareData.phone) {
        throw new customError(StatusCodes.NOT_FOUND, '사용자가 없습니다.');
      }
    }

    return user;
  },
};

export default authService;
