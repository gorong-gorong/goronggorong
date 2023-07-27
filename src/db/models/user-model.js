import { User } from '../schemas';

const userModel = {
  // email로 사용자 검색
  findByEmail: async function (userEmail) {
    const user = await User.findOne({ email: userEmail });

    return user;
  },

  // 사용자 생성
  createUser: async function (userData) {
    const user = await User.create(userData);

    return user;
  },

  // 사용자 정보 수정
  updateUser: async function (userEmail, editedData) {
    const updatedResult = await User.updateOne({ email: userEmail }, editedData);

    return updatedResult;
  },

  // 사용자 삭제
  deleteUser: async function (userEmail) {
    const deletedUser = await User.deleteOne({ email: userEmail });

    return deletedUser;
  },
};

export default userModel;
