import { Request, Response } from "express";
import { TProduct } from "./product.types";
import ProductServices from "./product.services";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../helpers/httpError";
import { HttpStatus } from "../../constants/HTTPERRORS";

class ProductControllers {
  async getProducts(_req: Request, res: Response) {
    try {
      const products = await ProductServices.getProducts();

      if (!products) {
        throw new InternalServerError();
      }
      if (products.length < 1) {
        throw new NotFoundError("No se encontraron productos en stock");
      }

      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal Server Error" });
      }
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const { productData }: { productData: TProduct } = req.body;
      const { stock } = req.body;
      const { user } = req;
      if (!productData || !stock) {
        throw new BadRequestError("Proporcione los datos requeridos");
      }
      const product = {
        name: productData.name,
        category_id: productData.category_id,
        user_id: user!.id,
        description: productData.description,
      };

      const newProduct = await ProductServices.createNewProduct(product, stock);

      if (!newProduct) {
        throw new BadRequestError("Hubo un error al crear el producto");
      }

      res.status(201).json({ message: "Producto creado" });
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal Server Error" });
      }
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const { productData }: { productData: TProduct } = req.body;
      const { stock } = req.body;

      const updatedProduct = await ProductServices.updateProduct(
        productData,
        stock
      );
      if (updatedProduct == false) {
        throw new InternalServerError();
      }
      res.status(204).json();
    } catch (error) {
      if (error instanceof InternalServerError) {
        res.status(error.status).json(error.message);
      }
    }
  }
}

export default ProductControllers;
