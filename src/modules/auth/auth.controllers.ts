import { Request, Response } from "express";
import AuthServices from "./auth.services";
import { TLogin } from "./auth.types";
import { BadRequestError } from "../../helpers/httpError";
import { HttpStatus } from "../../constants/HTTPERRORS";

class AuthControllers {
  constructor() {}

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { credentials }: { credentials: TLogin } = req.body;
      if (!credentials.email && credentials.password) {
        throw new BadRequestError("Proporcione los datos requeridos");
      }
      const token = await AuthServices.login(credentials);
      console.log(token);
      console.log("hola");
      if (!token) {
        throw new BadRequestError("Credenciales incorrectas");
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
