import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { userModel } from '../db';

const usersService = {
  // 유효/중복 사용자 확인
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

  // 사용자 생성
  createUser: async (userInfo) => {
    const hashedPassword = await usersService.createHashPassword(userInfo.password);
    const user = await userModel.createUser({
      ...userInfo,
      password: hashedPassword,
    });

    if (!user) {
      throw new customError(StatusCodes.BAD_REQUEST, '사용자를 생성하는데 실패했습니다.');
    }

    return user;
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

  // 해시된 비밀번호 생성
  createHashPassword: async (password) => {
    const salt = 12;
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  },
};

export default usersService;
