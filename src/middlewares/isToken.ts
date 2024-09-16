import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../helpers/httpError";
import jwtServices from "../helpers/jwt/jwt.services";
import User from "../modules/user/user.model";

export const isToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedError("Token not found");
    }
    token = token.replace("Bearer ", "");
    const decoded = jwtServices.verifyJWT(token);

    if (!decoded) {
      throw new UnauthorizedError("Invalid Token");
    }

    const user = await User.findByPk(decoded.user_id);

    if (!user) {
      throw new UnauthorizedError("Invalid User");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      res.status(error.status).json(error.message);
    }
  }
};
