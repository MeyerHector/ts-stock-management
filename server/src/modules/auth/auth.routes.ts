import { Request, Response } from "express";
import BaseRoutes from "../../helpers/route";
import AuthControllers from "./auth.controllers";
import { isToken } from "../../middlewares/isToken";

class AuthRoutes extends BaseRoutes {
  public authControllers: AuthControllers;

  constructor() {
    super();
    this.authControllers = new AuthControllers();
  }

  routes(): void {
    this.router.post("/login", (req: Request, res: Response) =>
      this.authControllers.login(req, res)
    );
    this.router.get("/verify-token", isToken, (req: Request, res: Response) =>
      this.authControllers.verifyToken(req, res)
    );
  }
}

export default new AuthRoutes().router;
