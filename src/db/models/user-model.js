import { User } from '../schemas';

const userModel = {
  // email로 사용자 검색
  findByEmail: async function (email) {
    const user = await User.findOne({ email });

    return user;
  },

  // id로 사용자 검색
  findById: async function (_id) {
    const user = await User.findOne({ _id });

    return user;
  },

  // 사용자 생성
  createUser: async function (userInfo) {
    const user = await User.create(userInfo);

    return user;
  },

  // 사용자 정보 수정
  updateUser: async function (userId, editedInfo) {
    const updatedResult = await User.updateOne({ _id: userId }, editedInfo);

    return updatedResult;
  },

  // 사용자 삭제
  deleteUser: async function (userId) {
    const deletedUser = await User.deleteOne({ _id: userId });

    return deletedUser;
  },
};

export default userModel;
