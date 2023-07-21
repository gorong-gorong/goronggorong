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

  // /password-reset
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

  mypageVerify: async (req, res, next) => {
    const { password } = req.body;
    const authHeader = req.header('Authorization');
    try {
      const decoded = await authService.decodeToken(authHeader);

      const user = await userService.checkUserExist(decoded.email, true);

      const isMatch = await authService.verifyPassword(password, user.password);

      if (!isMatch) {
        throw new customError(401, '잘못된 비밀번호입니다.');
      }
      return res.status(200).json({
        message: '유저 확인 성공',
        data: decoded,
      });
    } catch (err) {
      next(err);
    }
  },

  myPageUpdate: async (req, res, next) => {
    const { name, password, phone, address } = req.body;
    const authHeader = req.header('Authorization');

    try {
      if (!name || !password || !phone || !address) {
        throw new customError(
          400,
          `누락된 데이터가 있습니다. 항목: ${!name ? '이름' : ''}${!password ? ', 비밀번호' : ''}${
            !phone ? ', 전화번호' : ''
          }${!address ? ', 주소' : ''}`,
        );
      }

      const decoded = authService.decodeToken(authHeader);
      let user = await userService.checkUserExist(decoded.email, true);
      const hashedPassword = await authService.createHashPassword(password);
      const refreshToken = await authService.signToken(user);
      const updatedResult = await userModel.updateUser(user._id, {
        name: name,
        email: user.email,
        password: password,
        phone: phone,
        address: address,
        password: hashedPassword,
        refreshToken,
      });
      if (updatedResult.acknowledged === false) {
        throw new customError(400, '사용자 정보 업데이트가 실패했습니다.');
      }

      user = await userService.checkUserExist(user.email, true);

      return res.status(200).json({
        message: '사용자 정보 업데이트를 성공했습니다',
        data: user,
        token: refreshToken,
      });
    } catch (err) {
      next(err);
    }
  },

  myPageDelete: async (req, res, next) => {
    const authHeader = req.header('Authorization');

    try {
      // 사용자가 있는지 확인
      const decoded = await authService.decodeToken(authHeader);
      const user = await userService.checkUserExist(decoded.email, true);

      const deletedUser = await userModel.deleteUser({ _id: user._id });

      if (!deletedUser) {
        throw new customError(400, '사용자 삭제에 실패했습니다.');
      }

      return res.status(200).json({
        message: '사용자 삭제 성공',
        data: deletedUser,
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
