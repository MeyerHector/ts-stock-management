import { Request, Response } from "express";
import authServices from "./auth.services";
import { TLogin } from "./auth.types";
import { BadRequestError, InternalServerError } from "../../helpers/httpError";
import { HttpStatus } from "../../constants/HTTPERRORS";

class AuthControllers {
  constructor() {}

  async login(req: Request, res: Response): Promise<void> {
    try {
      const credentials: TLogin = req.body;
      const token = await authServices.login(credentials);
      if (!token) {
        new BadRequestError("Credenciales incorrectas");
      }
      res.status(200).json(token);
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
}

export default AuthControllers;
