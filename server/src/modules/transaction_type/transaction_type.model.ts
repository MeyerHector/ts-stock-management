import { UUIDV4 } from "sequelize";
import {
  Table,
  Column,
  Model,
  Default,
  PrimaryKey,
  DataType,
  AllowNull,
  HasMany,
} from "sequelize-typescript";
import Stock_history from "../stock_history/stock_history.model";

@Table({ timestamps: false })
class Transaction_type extends Model {
  @Default(UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @HasMany(() => Stock_history)
  declare stock_history_id: Stock_history;
}

export default Transaction_type;
