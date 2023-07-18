import { userService, authService } from '../services/index.js';
import { customError } from '../middlewares/index.js';
import { userModel } from '../db/index.js';

const userController = {
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
        info: decoded,
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
        info: user,
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
        info: deletedUser,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default userController;
