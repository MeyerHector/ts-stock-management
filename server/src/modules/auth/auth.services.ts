import jwtServices from "../../helpers/jwt/jwt.services";
import User from "../user/user.model";
import hashServices from "../../helpers/hash";
import UserServices from "../user/user.services";
import { TCreateUser } from "../user/user.types";
import { TLogin, TLoginData } from "./auth.types";

class AuthService {
  constructor() {}

  async login(credentials: TLogin): Promise<object | unknown> {
    try {
      const isUser: User | null = await UserServices.findByUsername(
        credentials.username
      );

      if (!isUser) return;

      if (
        !(await hashServices.comparePass(credentials.password, isUser.password))
      ) {
        return;
      }

      const token = jwtServices.createJWT(isUser.id);
      return {
        token,
        role: isUser.role.name,
      } as TLoginData;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async registerUser(user: TCreateUser): Promise<string | unknown> {
    try {
      const newUser: User | null = await UserServices.creteUser(user);
      return newUser;
    } catch (error) {
      return null;
    }
  }
}

export default new AuthService();
