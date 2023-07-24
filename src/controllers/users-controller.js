import { StatusCodes } from 'http-status-codes';
import { usersService } from '../services';

const usersController = {
  // post /users
  createUser: async function (req, res, next) {
    try {
      const { name, email, password, phone, address } = req.body;
      await usersService.checkUserOverlap(email);
      await usersService.createUser({ name, email, password, phone, address });

      return res.status(StatusCodes.CREATED).json({
        message: '사용자가 생성됐습니다.',
      });
    } catch (err) {
      next(err);
    }
  },

  // get /users
  getUser: async function (req, res, next) {
    try {
      const decodedToken = req.decoded;
      const user = await usersService.getUser(decodedToken._id);

      return res.status(StatusCodes.OK).json({
        message: '사용자 정보를 불러왔습니다.',
        data: { name: user.name, email: user.email, phone: user.phone, address: user.address },
      });
    } catch (err) {
      next(err);
    }
  },

  // put /users
  updateUser: async function (req, res, next) {
    try {
      // email, name, phone 수정 불가능
      const { password, address } = req.body;
      const decodedToken = req.decoded;
      await usersService.updateUser(decodedToken._id, { password, address });

      return res.status(StatusCodes.OK).json({
        message: '사용자 정보를 수정했습니다.',
      });
    } catch (err) {
      next(err);
    }
  },

  // delete /users
  deleteUser: async function (req, res, next) {
    try {
      const decodedToken = req.decoded;
      await usersService.deleteUser(decodedToken._id);

      return res.status(StatusCodes.OK).json({
        message: '회원 탈퇴했습니다.',
      });
    } catch (err) {
      next(err);
    }
  },
};

export default usersController;
