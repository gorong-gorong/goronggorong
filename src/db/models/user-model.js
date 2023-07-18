import { User } from '../schemas/index.js';

const userModel = {
  findAll: async () => {
    const users = await User.find({});

    return users;
  },
  findByEmail: async (email) => {
    const user = await User.findOne({ email });

    return user;
  },
  findById: async (_id) => {
    const user = await User.findOne({ _id });

    return user;
  },
  createUser: async (userInfo) => {
    const user = await User.create(userInfo);

    return user;
  },
  updateUser: async (userId, editedInfo) => {
    const updatedResult = await User.updateOne({ _id: userId }, editedInfo);

    return updatedResult;
  },
  deleteUser: async (userId) => {
    const deletedUser = await User.deleteOne({ _id: userId });

    return deletedUser;
  },
};

export default userModel;
