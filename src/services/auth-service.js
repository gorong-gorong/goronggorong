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
  checkUserExist: async (email, existFlag) => {
    const user = await userModel.findByEmail(email);

    if (existFlag === false && user) {
      // 사용자가 없어야 하는데 있을 때
      throw new customError(400, '사용자가 이미 있습니다');
    } else if (existFlag === true && !user) {
      // 사용자가 있어야 하는데 없을 때
      throw new customError(404, '사용자가 없습니다.');
    }

    return user;
  },
  checkAndCreateUser: async (userInfo) => {
    // 사용자 생성
    const hashedPassword = await authService.createHashPassword(userInfo.password);
    const user = await userModel.createUser({
      ...userInfo,
      password: hashedPassword,
    });

    if (!user) {
      throw new customError(400, '사용자를 생성하는데 실패했습니다.');
    }

    return user;
  },
  resetPassword: async (user) => {
    const resetPassword = authService.createRandomPassword();
    const hashedPassword = await authService.createHashPassword(resetPassword);
    await userModel.updateUser(user._id, { password: hashedPassword });

    return resetPassword;
  },
};

export default authService;
