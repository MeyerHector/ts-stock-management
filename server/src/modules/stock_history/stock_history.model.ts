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
import Stock from "../stock/stock.model";
import User from "../user/user.model";
import Transaction_type from "../transaction_type/transaction_type.model";

@Table
class Stock_history extends Model {
  @Default(UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @ForeignKey(() => Stock)
  @Column(DataType.UUID)
  declare stock_id: string;

  @BelongsTo(() => Stock)
  declare stock: Stock;

  @AllowNull(false)
  @ForeignKey(() => Transaction_type)
  @Column(DataType.UUID)
  declare transaction_type_id: string;

  @BelongsTo(() => Transaction_type)
  declare transaction_type: Transaction_type;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  declare user_id: string;

  @BelongsTo(() => User)
  declare user: User;
}

export default Stock_history;
