import {
  createUserService,
  updateUserService,
  deleteUserService,
} from "../../../services/users/index";

const userMutations = {
  async addUser(parent, args) {
    const user = await createUserService(args.data);
    return user;
  },
  async updateUser(parent, args) {
    const userData = args.data;
    userData.userId = args.id;
    const user = await updateUserService(userData);
    return user;
  },
  async deleteUser(parent, args) {
    const userId = args.id;
    const user = await deleteUserService({ userId });
    return user;
  },
};

export default userMutations;
