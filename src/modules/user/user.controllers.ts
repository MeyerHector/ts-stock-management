import { Request, Response } from "express";
import { TCreateUser } from "./user.types";
import UserServices from "./user.services";
import { BadRequestError, NotFoundError } from "../../helpers/httpError";
import { HttpStatus } from "../../constants/HTTPERRORS";

class UserControllers {
  constructor() {}

  async createUser(req: Request, res: Response) {
    try {
      const { user }: { user: TCreateUser } = req.body;

      const createdUser = await UserServices.creteUser(user);

      if (!createdUser) {
        throw new BadRequestError("Email ya registrado");
      }

      res.status(201).json({ message: "Usuario generado con éxito" });
    } catch (error) {
      if (error instanceof BadRequestError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal Server Error" });
      }
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserServices.getUsers();
      if (users.length < 1) {
        throw new NotFoundError("No se encontraron usuarios");
      }
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal Server Error" });
      }
    }
  }
}

export default UserControllers;
