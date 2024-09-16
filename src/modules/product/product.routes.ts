import { Request, Response } from "express";
import BaseRoutes from "../../helpers/route";
import ProductControllers from "./product.controllers";
import { isToken } from "../../middlewares/isToken";
import { isEmployee } from "../../middlewares/isEmployee";

class ProductRoutes extends BaseRoutes {
  public productControllers: ProductControllers;

  constructor() {
    super();
    this.productControllers = new ProductControllers();
  }

  routes(): void {
    this.router.get(
      "/products",
      isToken,
      isEmployee,
      (req: Request, res: Response) =>
        this.productControllers.getProducts(req, res)
    );
    this.router.post(
      "/product",
      isToken,
      isEmployee,
      (req: Request, res: Response) =>
        this.productControllers.createProduct(req, res)
    );
  }
}

export default new ProductRoutes().router;
