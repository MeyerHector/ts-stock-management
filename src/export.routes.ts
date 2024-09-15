import { Application } from "express";

const routes = (app: Application) => {
  app.use("/api/auth");
};

export default routes;
