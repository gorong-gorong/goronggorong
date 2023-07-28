import { StatusCodes } from 'http-status-codes';
import { userModel } from '../db';
import { bcryptUtils } from '../utils';
import { customError } from '../middlewares';
import { ordersService } from '../services';

const usersService = {
  // 중복된 사용자인지 확인
  checkUserOverlap: async function (email) {
    const user = await userModel.findByEmail(email);

    if (user) {
      throw new customError(StatusCodes.BAD_REQUEST, '사용자가 이미 있습니다');
    }

    return user;
  },

  // 사용자 생성
  createUser: async function (userData) {
    const hashedPassword = await bcryptUtils.createHashPassword(userData.password);
    const user = await userModel.createUser({
      ...userData,
      password: hashedPassword,
    });

    if (!user) {
      throw new customError(StatusCodes.BAD_REQUEST, '사용자를 생성하는데 실패했습니다.');
    }

    return user;
  },

  // 사용자 정보 수정
  updateUser: async function (userEmail, updateData) {
    let result;

    if (updateData.password) {
      const hashedPassword = await bcryptUtils.createHashPassword(updateData.password);

      result = await userModel.updateUser(userEmail, {
        password: hashedPassword,
      });
    } else {
      result = await userModel.updateUser(userEmail, {
        ...updateData,
      });
    }

    if (!result) {
      throw new customError(StatusCodes.BAD_REQUEST, '사용자 정보를 수정하는데 실패했습니다.');
    }
  },

  // 회원탈퇴
  deleteUser: async function (userEmail) {
    const result = await userModel.deleteUser(userEmail);

    if (!result) {
      throw new customError(StatusCodes.BAD_REQUEST, '사용자 삭제에 실패했습니다.');
    }

    // 탈퇴할 사용자의 주문 내역 삭제
    await ordersService.deleteUserOrders(userEmail);
  },

  // 사용자 정보 가져오기
  getUser: async function (userEmail) {
    const user = await userModel.findByEmail(userEmail);

    if (!user) {
      throw new customError(StatusCodes.NOT_FOUND, '사용자가 없습니다.');
    }

    return user;
  },
};

export default usersService;
