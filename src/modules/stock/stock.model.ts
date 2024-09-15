import { UUIDV4 } from "sequelize";
import {
  Table,
  Column,
  Model,
  Default,
  PrimaryKey,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Product from "../product/product.model";

@Table
class Stock extends Model {
  @Default(UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare stock: number;

  @ForeignKey(() => Product)
  @Column(DataType.UUID)
  declare product_id: string;

  @BelongsTo(() => Product)
  declare product: Product;
}

export default Stock;
