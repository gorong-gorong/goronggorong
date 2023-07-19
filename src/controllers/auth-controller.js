import { StatusCodes } from 'http-status-codes';
import { authService } from '../services';
import { userModel } from '../db';

const authController = {
  // /signup
  signUp: async (req, res, next) => {
    try {
      const { name, email, password, phone, address } = req.body;
      await authService.checkUserStatus(email, 'overlap');
      await authService.createUser({ name, email, password, phone, address });

      return res.status(StatusCodes.CREATED).json({
        message: '사용자가 생성됐습니다.',
      });
    } catch (err) {
      next(err);
    }
  },

  // /signin
  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await authService.checkUserStatus(email, 'valid');
      await authService.verifyPassword(password, user.password);
      const token = await authService.signToken(user);

      return res.status(StatusCodes.OK).json({
        message: '로그인 성공',
        data: { token },
      });
    } catch (err) {
      next(err);
    }
  },

  // password-reset
  resetPassword: async (req, res, next) => {
    try {
      const { name, email, phone } = req.body;
      const user = await authService.checkUserStatus(email, 'valid', { name, phone });
      const resetPassword = await authService.resetPassword(user);

      return res.status(StatusCodes.OK).json({
        message: '비밀번호가 초기화 됐습니다.',
        data: { resetPassword },
      });
    } catch (err) {
      next(err);
    }
  },

  // /user-info
  getUserInfo: async (req, res, next) => {
    try {
      const authHeader = req.header('Authorization');
      const decodedInfo = authService.decodeToken(authHeader);
      const user = await userModel.findById(decodedInfo._id);

      return res.status(StatusCodes.OK).json({
        message: '사용자 정보를 불러왔습니다.',
        data: { name: user.name, email: user.email, phone: user.phone, address: user.address },
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
