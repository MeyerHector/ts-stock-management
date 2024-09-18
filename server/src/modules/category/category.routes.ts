import { Request, Response } from "express";
import BaseRoutes from "../../helpers/route";
import CategoryControllers from "./category.controllers";
import { isToken } from "../../middlewares/isToken";
import { isEmployee } from "../../middlewares/isEmployee";

class CategoryRoutes extends BaseRoutes {
  public categoryControllers: CategoryControllers;

  constructor() {
    super();
    this.categoryControllers = new CategoryControllers();
  }

  routes(): void {
    this.router.get(
      "/categories",
      isToken,
      isEmployee,
      (req: Request, res: Response) =>
        this.categoryControllers.getCategories(req, res)
    );
  }
}

export default new CategoryRoutes().router;
