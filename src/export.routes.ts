import { Application } from "express";
import AuthRoutes from "./modules/auth/auth.routes";
import UserRoutes from "./modules/user/user.routes";

const routes = (app: Application) => {
  app.use("/api/auth", AuthRoutes);
  app.use("/api/admin", UserRoutes);
};

export default routes;
