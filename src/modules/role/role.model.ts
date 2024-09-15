import { UUIDV4 } from "sequelize";
import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  PrimaryKey,
  Table,
  Model,
  NotEmpty,
} from "sequelize-typescript";
import User from "../user/user.model";

@Table
class Role extends Model {
  @Default(UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING)
  declare name: string;

  @HasMany(() => User)
  declare users: User[];
}

export const createRoles = async () => {
  try {
    await Role.bulkCreate([{ name: "admin" }, { name: "user" }]);
    console.log("Roles created successfully.");
  } catch (error) {
    console.error("Error creating roles:", error);
  }
};

export default Role;
