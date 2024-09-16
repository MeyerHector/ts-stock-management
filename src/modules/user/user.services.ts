import { TCreateUser, TUpdateUser } from "./user.types";
import User from "./user.model";
import RoleServices from "../role/role.services";
import HashServices from "../../helpers/hash";
class UserServices {
  constructor() {}

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      return null;
    }
  }

  async creteUser(user: TCreateUser): Promise<User | null> {
    try {
      const isAccount = await this.findUserByEmail(user.email);
      if (isAccount) return null;
      const role = await RoleServices.getRole("employee");
      if (!role) return null;
      return await User.create({
        name: user.name,
        email: user.email,
        password: await HashServices.hashPass(user.password),
        role_id: role,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const employeeId = await RoleServices.getRole("employee");
      const users = await User.findAll({ where: { role_id: employeeId } });
      return users;
    } catch (error) {
      return [];
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
