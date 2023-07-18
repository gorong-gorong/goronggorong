import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userModel } from '../db/models/index.js';
import { customError } from '../middlewares/error-handler.js';

const authService = {
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
      throw new customError(400, '토큰을 업데이트 하는데 실패했습니다.');
    }

    return newToken;
  },
  createHashPassword: async (password) => {
    const salt = 12;
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  },
  verifyPassword: async (password, original) => {
    const result = await bcrypt.compare(password, original);

    if (result === false) {
      throw new customError(400, '비밀번호가 틀렸습니다');
    }

    return result;
  },
  createRandomPassword: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
  },
  decodeToken: (authHeader) => {
    const token = authHeader ? authHeader.replace('Bearer ', '') : null;
    if (!token) {
      throw new customError(404, '토큰이 없습니다.');
    }

    const decodedInfo = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedInfo) {
      throw new customError(401, '잘못된 토큰입니다.');
    }

    return decodedInfo;
  },
};

export default authService;

/*
 * BCRYPT
 * .hash: hash password 생성
 * .compare: hashpassword 비교
 */
