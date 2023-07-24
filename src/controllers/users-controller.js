import { StatusCodes } from 'http-status-codes';
import { usersService } from '../services';
import { userModel } from '../db';

const usersController = {
  // post /user
  createUser: async (req, res, next) => {
    try {
      const { name, email, password, phone, address } = req.body;
      await usersService.checkUserStatus(email, 'overlap');
      await usersService.createUser({ name, email, password, phone, address });

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
      const decodedInfo = usersService.decodeToken(authHeader);
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
      let user = await usersService.checkUserExist(decoded.email, true);
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

      user = await usersService.checkUserExist(user.email, true);

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
      const user = await usersService.checkUserExist(decoded.email, true);

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

export default usersController;
