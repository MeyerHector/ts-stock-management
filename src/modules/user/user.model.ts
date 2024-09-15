import { UUIDV4 } from "sequelize";
import HashServices from "../../helpers/hash";
import {
  Table,
  Column,
  Model,
  Default,
  PrimaryKey,
  DataType,
  AllowNull,
  BelongsTo,
  ForeignKey,
  NotEmpty,
} from "sequelize-typescript";
import Role from "../role/role.model";

@Table
class User extends Model {
  @Default(UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING)
  declare password: string;

  @ForeignKey(() => Role)
  @Column(DataType.UUID)
  declare role_id: string;

  @BelongsTo(() => Role)
  declare role: Role;
}

export const createAdminUser = async () => {
  try {
    const adminRole = await Role.findOne({ where: { name: "admin" } });
    if (!adminRole) {
      throw new Error("Admin role not found");
    }

    const hashedPassword = await HashServices.hashPass("Admin.1");

    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role_id: adminRole.id,
    });
    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

export default User;
