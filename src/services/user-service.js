import { userModel } from '../db/index.js';
import { customError } from '../middlewares/index.js';
import { authService } from './index.js';

const userService = {
  checkAndCreateUser: async (userInfo) => {
    // 사용자 생성
    const hashedPassword = await authService.createHashPassword(userInfo.password);
    const user = await userModel.createUser({
      ...userInfo,
      password: hashedPassword,
    });

    if (!user) {
      throw new customError(400, '사용자를 생성하는데 실패했습니다.');
    }

    return user;
  },
  checkUserExist: async (email, existFlag) => {
    const user = await userModel.findByEmail(email);

    if (existFlag === false && user) {
      // 사용자가 없어야 하는데 있을 때
      throw new customError(400, '사용자가 이미 있습니다');
    } else if (existFlag === true && !user) {
      // 사용자가 있어야 하는데 없을 때
      throw new customError(404, '사용자가 없습니다.');
    }

    return user;
  },
  resetPassword: async (user) => {
    const resetPassword = authService.createRandomPassword();
    const hashedPassword = await authService.createHashPassword(resetPassword);
    await userModel.updateUser(user._id, { password: hashedPassword });

    return resetPassword;
  },
};

export default userService;
