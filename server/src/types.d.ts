import User from "./modules/user/user.model";

declare global {
  declare namespace Express {
    interface Request {
      user?: User;
    }
  }
}
