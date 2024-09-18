import { Request, Response } from "express";
import AuthServices from "./auth.services";
import { TLogin, TLoginData } from "./auth.types";
import { BadRequestError } from "../../helpers/httpError";
import { HttpStatus } from "../../constants/HTTPERRORS";
import jwtServices from "../../helpers/jwt/jwt.services";

class AuthControllers {
  constructor() {}

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { credentials }: { credentials: TLogin } = req.body;
      console.log(credentials);
      if (!credentials.username && credentials.password) {
        throw new BadRequestError("Proporcione los datos requeridos");
      }
      const data = (await AuthServices.login(credentials)) as TLoginData;
      if (!data) {
        throw new BadRequestError("Credenciales incorrectas");
      }

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal Server Error" });
      }
    }
  }

  async verifyToken(req: Request, res: Response) {
    try {
      const existingUser = req.user!;
      const token = jwtServices.createJWT(existingUser.id);
      return res.status(200).json({ existingUser, token });
    } catch (error) {
      console.log(error);
      res.status(500).json();
    }
  }
}

export default AuthControllers;
