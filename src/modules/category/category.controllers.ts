import { Request, Response } from "express";
import { InternalServerError } from "../../helpers/httpError";
import CategoryServices from "./category.services";

class CategoryControllers {
  async getCategories(_req: Request, res: Response) {
    try {
      const categories = await CategoryServices.getCategories();
      if (!categories) {
        throw new InternalServerError();
      }
      res.status(200).json(categories);
    } catch (error) {
      if (error instanceof InternalServerError) {
        res.status(error.status).json(error.message);
      }
    }
  }
}

export default CategoryControllers;
