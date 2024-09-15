import { UUIDV4 } from "sequelize";
import {
  AllowNull,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Product from "../product/product.model";

@Table
class Category extends Model {
  @Default(UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @ForeignKey(() => Product)
  @Column(DataType.UUID)
  declare product_id: string;
}

export default Category;
