import { StatusCodes } from 'http-status-codes';
import { authService, tokenHandler } from '../services';

const authController = {
  // post /auth/signin
  signIn: async function (req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.checkUserValidation(email);
      await authService.verifyPassword(password, user.password);
      const { refreshToken, accessToken } = await authService.signToken(user);
      // const accessToken = await authService.signToken(user);

      res.header('X-Refresh-Token', `Bearer ${refreshToken}`);
      res.header('Authorization', `Bearer ${accessToken}`);

      return res.status(StatusCodes.OK).json({
        message: '로그인에 성공했습니다.',
      });
    } catch (err) {
      next(err);
    }
  },

  // post /auth/password-reset
  resetPassword: async function (req, res, next) {
    try {
      const { name, email, phone } = req.body;
      const user = await authService.checkUserValidation(email, { name, phone });
      const resetPassword = await authService.resetPassword(user.email);

      return res.status(StatusCodes.OK).json({
        message: '비밀번호가 초기화 됐습니다.',
        data: { resetPassword },
      });
    } catch (err) {
      next(err);
    }
  },

  // post /auth/validation
  checkUserValidation: async function (req, res, next) {
    try {
      const { password } = req.body;
      const userEmail = req.decoded.email;
      const user = await authService.checkUserValidation(userEmail);
      await authService.verifyPassword(password, user.password);

      return res.status(StatusCodes.OK).json({
        message: '비밀번호가 확인됐습니다.',
      });
    } catch (err) {
      next(err);
    }
  },

  // post /auth/tokens
  getNewAccessToken: async function (req, res, next) {
    try {
      const authHeader = req.header('Authorization');
      const accessToken = authHeader ? authHeader.replace('Bearer ', '') : null;

      const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
      const newAccessToken = tokenHandler.createAccessToken(decodedAccessToken);

      res.header('Authorization', newAccessToken);

      res.status(StatusCodes.OK).json({
        message: '새 Access Token을 발급했습니다.',
      });
    } catch (err) {
      next(err);
    }
  },
};

export default authController;
