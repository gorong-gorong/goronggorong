import { customError } from '../middlewares/index.js';
import { authService } from '../services/index.js';
import { userModel } from '../db/index.js';

const authController = {
  createUser: async (req, res, next) => {
    const { name, email, password, phone, address } = req.body;

    try {
      if (!name || !email || !password || !phone || !address) {
        throw new customError(400, '누락된 데이터가 있습니다.');
      }

      await authService.checkUserExist(email, false); // 사용자가 없어야만 함
      const user = await authService.checkAndCreateUser({ name, email, password, phone, address });

      // 201 Created
      return res.status(201).json({
        message: '사용자가 생성됐습니다.',
        info: user,
      });
    } catch (err) {
      next(err);
    }
  },
  verifyUser: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        throw new customError(400, '누락된 데이터가 있습니다.');
      }

      const user = await authService.checkUserExist(email, true); // 사용자가 있어야 함
      const result = await authService.verifyPassword(password, user.password);
      const token = await authService.signToken(user);

      return res.status(200).json({
        message: '로그인 성공',
        info: result,
        token,
      });
    } catch (err) {
      next(err);
    }
  },

  findPassword: async (req, res, next) => {
    const { name, email, phone } = req.body;

    try {
      if (!name || !email || !phone) {
        throw new customError(400, '누락된 데이터가 있습니다.');
      }

      const user = await authService.checkUserExist(email, true);
      if (user.name !== name || user.phone !== phone) {
        throw new customError(404, '없는 사용자 입니다.');
      }

      const resetPassword = await authService.resetPassword(user);

      return res.status(200).json({
        message: '비밀번호가 초기화 됐습니다.',
        info: resetPassword,
      });
    } catch (err) {
      next(err);
    }
  },

  getUserInfo: async (req, res, next) => {
    const authHeader = req.header('Authorization');

    try {
      if (!authHeader) {
        throw new customError(400, '유효하지 않은 토큰입니다.');
      }

      const decodedInfo = authService.decodeToken(authHeader);
      const user = await userModel.findById(decodedInfo._id);

      return res.status(200).json({
        message: '토큰이 확인됐습니다',
        info: user,
      });
    } catch (err) {
      next(err);
    }
  },
  /* refreshToken: async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (authHeader) {
      throw new customError(400, '유효하지 않은 토큰입니다.');
    }
    const token = authHeader ? authHeader.replace('Bearer ', '') : null;
    if (!token) {
      throw new customError(400, '토큰이 없습니다.');
    }

    const decoded = authService.signToken(token);

    return res.status(200).json({
      message: '토큰이 확인됐습니다',
      info: decoded,
    });
  }, */
};

export default authController;
