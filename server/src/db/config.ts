import { Sequelize } from "sequelize-typescript";
import { DB_NAME, DB_PASS, DB_USER } from "../config/conf";
import User from "../modules/user/user.model";
import Role from "../modules/role/role.model";
import Product from "../modules/product/product.model";
import Stock from "../modules/stock/stock.model";
import Category from "../modules/category/category.model";
import Stock_history from "../modules/stock_history/stock_history.model";
import Transaction_type from "../modules/transaction_type/transaction_type.model";
export const sequelize = new Sequelize({
  database: DB_NAME,
  dialect: "postgres",
  username: DB_USER,
  password: DB_PASS,
  models: [
    User,
    Role,
    Product,
    Stock,
    Category,
    Stock_history,
    Transaction_type,
  ],
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to db has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
