import { Category } from '../models/category.model';

export const CategoryService = {
  async getCategoryById(id: string) {
    try {
      return await Category.findByPk(id);
    } catch (error) {
      console.log(error);
    }
  },
  async removeCategoryById(id: string) {
    try {
      return await Category.destroy({
        where: { id },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
