import { StatusCodes } from 'http-status-codes';
import { tokenHandler, usersService } from '../services';

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
      const userEmail = req.decoded.email;
      const user = await usersService.getUser(userEmail);

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
      // email 수정 불가능
      // phone, name, password, address 수정가능하게
      const { name, phone, password, address } = req.body;
      const userEmail = req.decoded.email;
      await usersService.updateUser(userEmail, { name, phone, password, address });

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
      await tokenHandler.deleteRefreshFromRedis(req);
      await tokenHandler.addAccessTokenToBlackList(req);

      const userEmail = req.decoded.email;
      await usersService.deleteUser(userEmail);

      return res.status(StatusCodes.OK).json({
        message: '회원 탈퇴 했습니다.',
      });
    } catch (err) {
      next(err);
    }
  },
};

export default usersController;
