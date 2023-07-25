import { StatusCodes } from 'http-status-codes';
import { userModel } from '../db';
import { bcryptUtils } from '../utils';
import { customError } from '../middlewares';

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
  createUser: async function (userInfo) {
    const hashedPassword = await bcryptUtils.createHashPassword(userInfo.password);
    const user = await userModel.createUser({
      ...userInfo,
      password: hashedPassword,
    });

    if (!user) {
      throw new customError(StatusCodes.BAD_REQUEST, '사용자를 생성하는데 실패했습니다.');
    }

    return user;
  },

  // 사용자 정보 수정
  updateUser: async function (_id, updateInfo) {
    const user = await userModel.findById(_id);
    const hashedPassword = await bcryptUtils.createHashPassword(updateInfo.password);
    const result = await userModel.updateUser(user._id, {
      ...updateInfo,
      password: hashedPassword,
    });

    if (!result) {
      throw new customError(StatusCodes.BAD_REQUEST, '사용자 정보를 수정하는데 실패했습니다.');
    }
  },

  // 회원탈퇴
  deleteUser: async function (_id) {
    const result = await userModel.deleteUser({ _id });

    if (!result) {
      throw new customError(StatusCodes.BAD_REQUEST, '사용자 삭제에 실패했습니다.');
    }
  },

  // 사용자 정보 가져오기
  getUser: async function (_id) {
    const user = await userModel.findById(decodedToken._id);

    if (!user) {
      throw new customError(StatusCodes.NOT_FOUND, '사용자가 없습니다.');
    }

    return user;
  },
};

export default usersService;
