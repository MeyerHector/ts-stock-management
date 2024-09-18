import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../helpers/httpError";
import User from "../modules/user/user.model";
import Role from "../modules/role/role.model";
import { TUserId } from "../modules/user/user.types";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as TUserId;
    const user = await User.findByPk(id, {
      include: {
        model: Role,
      },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid User");
    }

    if (user.role.name !== "admin") {
      throw new UnauthorizedError("Unauthorized");
    }
    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      res.status(error.status).json(error.message);
    } else {
      res.status(500).json();
    }
  }
};
