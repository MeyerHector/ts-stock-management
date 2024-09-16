import { Application } from "express";
import AuthRoutes from "./modules/auth/auth.routes";
import UserRoutes from "./modules/user/user.routes";
import ProductRoutes from "./modules/product/product.routes";
import categoryRoutes from "./modules/category/category.routes";

const routes = (app: Application) => {
  app.use("/api/auth", AuthRoutes);
  app.use("/api/admin", UserRoutes);
  app.use("/api", ProductRoutes);
  app.use("/api", categoryRoutes);
};

export default routes;
