import { Request, Response } from "express";
import BaseRoutes from "../../helpers/route";
import AuthControllers from "./auth.controllers";

class AuthRoutes extends BaseRoutes {
  public authControllers: AuthControllers;

  constructor() {
    super();
    this.authControllers = new AuthControllers();
  }

  routes(): void {
    this.router.post(
      "/login",
      this.authControllers.login.bind(this.authControllers)
    );
  }
}

export default new AuthRoutes().router;
