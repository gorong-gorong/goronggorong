import { StatusCodes } from 'http-status-codes';
import { authService } from '../services';
import { userModel } from '../db';

const userController = {
  // post /user
  createUser: async (req, res, next) => {
    try {
      const { name, email, password, phone, address } = req.body;
      await userService.checkUserStatus(email, 'overlap');
      await userService.createUser({ name, email, password, phone, address });

      return res.status(StatusCodes.CREATED).json({
        message: '사용자가 생성됐습니다.',
      });
    } catch (err) {
      next(err);
    }
  },

  // get /user
  getUser: async (req, res, next) => {
    try {
      const authHeader = req.header('Authorization');
      const decodedInfo = userService.decodeToken(authHeader);
      const user = await userModel.findById(decodedInfo._id);

      return res.status(StatusCodes.OK).json({
        message: '사용자 정보를 불러왔습니다.',
        data: { name: user.name, email: user.email, phone: user.phone, address: user.address },
      });
    } catch (err) {
      next(err);
    }
  },

  // put /user
  updateUser: async (req, res, next) => {
    try {
      const { name, password, phone, address } = req.body;
      const authHeader = req.header('Authorization');
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

      user = await userService.checkUserExist(user.email, true);

      return res.status(StatusCodes.OK).json({
        message: '사용자 정보 업데이트를 성공했습니다',
        data: { user, refreshToken },
      });
    } catch (err) {
      next(err);
    }
  },

  // delete /user
  deleteUser: async (req, res, next) => {
    try {
      const authHeader = req.header('Authorization');
      // 사용자가 있는지 확인
      const decoded = await authService.decodeToken(authHeader);
      const user = await userService.checkUserExist(decoded.email, true);

      const deletedUser = await userModel.deleteUser({ _id: user._id });

      if (!deletedUser) {
        throw new customError(400, '사용자 삭제에 실패했습니다.');
      }

      return res.status(StatusCodes.OK).json({
        message: '사용자 삭제 성공',
      });
    } catch (err) {
      next(err);
    }
  },
};

export default userController;
