import { TCreateUser, TUpdateUser } from "./user.types";
import User from "./user.model";
class UserServices {
  constructor() {}

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      return null;
    }
  }

  async creteUser(user: TCreateUser): Promise<User | unknown> {
    try {
      return await User.create(user);
    } catch (error) {
      return error;
    }
  }

  async deleteUser(id: string): Promise<Number | unknown> {
    try {
      return await User.destroy({ where: { id } });
    } catch (error) {
      return error;
    }
  }

  async updateUser(user: TUpdateUser): Promise<Number | unknown> {
    try {
      return await User.update(user, { where: { id: user.id } });
    } catch (error) {
      return error;
    }
  }
}
export default new UserServices();
