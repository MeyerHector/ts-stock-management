import jwtServices from "../../helpers/jwt";
import User from "../user/user.model";
import hashServices from "../../helpers/hash";
import UserServices from "../user/user.services";
import { TCreateUser } from "../user/user.types";
import { TLogin } from "./auth.types";

class AuthService {
  constructor() {}

  async login(credentials: TLogin): Promise<String | unknown> {
    try {
      const isUser: User | null = await UserServices.findUserByEmail(
        credentials.email
      );
      if (!isUser) throw { message: "El email no está registrado" };

      if (
        !(await hashServices.comparePass(credentials.password, isUser.password))
      ) {
        throw { message: "Contraseña incorrecta" };
      }

      return jwtServices.createJWT(isUser.id);
    } catch (error) {
      return error;
    }
  }

  async registerUser(user: TCreateUser): Promise<String | unknown> {
    try {
      const newUser: User | unknown = await UserServices.creteUser(user);
      if (!newUser) {
        throw {
          message: "Hubo un error al registrar al usuario",
        };
      }
      return { message: "Usuario registrado con éxito" };
    } catch (error) {
      return error;
    }
  }
}

export default new AuthService();
