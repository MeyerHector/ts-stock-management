import { Request, Response } from "express";
import BaseRoutes from "../../helpers/route";
import UserControllers from "./user.controllers";
import { isToken } from "../../middlewares/isToken";
import { isAdmin } from "../../middlewares/isAdmin";
import { schema } from "./user.schema";
import { validateSchema } from "../../middlewares/validateSchema";
class UserRoutes extends BaseRoutes {
  public userControllers: UserControllers;

  constructor() {
    super();
    this.userControllers = new UserControllers();
  }

  routes(): void {
    this.router.post(
      "/user",
      isToken,
      isAdmin,
      schema,
      validateSchema,
      (req: Request, res: Response) => this.userControllers.createUser(req, res)
    );
    this.router.get("/users", isToken, isAdmin, (req: Request, res: Response) =>
      this.userControllers.getUsers(req, res)
    );
  }
}

export default new UserRoutes().router;
