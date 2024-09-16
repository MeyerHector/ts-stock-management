import { createCategories } from "../modules/category/category.model";
import { createRoles } from "../modules/role/role.model";
import { createAdminUser } from "../modules/user/user.model";
import { sequelize } from "./config";

export const sync = async () => {
  await sequelize.sync({ force: false });

  // Descomentar para hacer seed
  // await createRoles();
  // await createAdminUser();
  // await createCategories();
  console.log("All models were synchronized successfully.");
};
