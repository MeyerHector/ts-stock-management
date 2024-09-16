import { UUIDV4 } from "sequelize";
import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Product from "../product/product.model";

@Table({ timestamps: false })
class Category extends Model {
  @Default(UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @HasMany(() => Product)
  declare products: Product[];
}

export const createCategories = async () => {
  try {
    await Category.bulkCreate([
      { name: "Electrónica" },
      { name: "Ropa" },
      { name: "Hogar y Cocina" },
      { name: "Libros" },
      { name: "Juguetes y Juegos" },
      { name: "Deportes y Aire Libre" },
      { name: "Salud y Cuidado Personal" },
      { name: "Automotriz" },
    ]);
    console.log("Categories created successfully.");
  } catch (error) {
    console.error("Error creating categories:", error);
  }
};
export default Category;
