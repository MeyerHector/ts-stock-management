import Category from "./category.model";

class CategoryServices {
  async getCategories(): Promise<Category[] | undefined> {
    try {
      const categories: Category[] = await Category.findAll();
      if (categories.length < 1) return;
      return categories;
    } catch (error) {
      return;
    }
  }
}

export default new CategoryServices();
