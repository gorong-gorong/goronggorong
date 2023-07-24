import { StatusCodes } from 'http-status-codes';
import { authService } from '../services';

const authController = {
  // post /signin
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

  // post /password-reset
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

  // post /validation
  checkUserValidation: async (req, res, next) => {
    const { password } = req.body;
    const authHeader = req.header('Authorization');
    try {
      const decoded = authService.decodeToken(authHeader);
      const user = await userService.checkUserExist(decoded.email, true);
      const isMatch = await authService.verifyPassword(password, user.password);

      return res.status(StatusCodes.OK).json({
        message: '유저 확인 성공',
        data: { decoded },
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
