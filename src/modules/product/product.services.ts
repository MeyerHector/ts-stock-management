import { Op } from "sequelize";
import { sequelize } from "../../db/config";
import Category from "../category/category.model";
import Stock from "../stock/stock.model";
import Product from "./product.model";
import { TProduct } from "./product.types";
import User from "../user/user.model";

class ProductServices {
  async createNewProduct(
    product: TProduct,
    stock: number
  ): Promise<Product | undefined> {
    const t = await sequelize.transaction();
    try {
      const newProduct = await Product.create(product, { transaction: t });
      const productStock = await Stock.create(
        {
          product_id: newProduct.id,
          stock,
        },
        { transaction: t }
      );
      await t.commit();
      return newProduct;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async getProducts(): Promise<Product[] | undefined> {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: User,
            attributes: { exclude: ["password", "role_id"] },
          },
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: Stock,
            where: {
              stock: { [Op.gte]: 1 },
            },
          },
        ],
      });
      return products;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

export default new ProductServices();
