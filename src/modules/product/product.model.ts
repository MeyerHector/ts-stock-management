import { UUIDV4 } from "sequelize";
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Stock from "../stock/stock.model";
import User from "../user/user.model";
import Category from "../category/category.model";

@Table
class Product extends Model {
  @Default(UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @ForeignKey(() => Category)
  @Column(DataType.STRING)
  declare category_id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  declare user_id: string;

  @BelongsTo(() => User)
  declare role: User;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare description: string;

  @HasOne(() => Stock)
  declare stock: Stock;
}

export default Product;
