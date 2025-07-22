import { NextFunction, Request, Response } from 'express';
import { Category } from '../models/category.model';
import { CustomError } from '../helper/CustomError';
import { CategoryValidations } from '../validation/category.validation';
import { removeFile } from '../helper/removeFile';
import { CategoryService } from '../services/category.service';

export const CategoryController = {
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, isActive, sortOrder } = await CategoryValidations.CreateCategoryValidation(req.body);

      const category = await Category.create({
        name: JSON.parse(name),
        description: JSON.parse(description),
        image: req?.file?.filename,
        isActive,
        sortOrder,
      });
      res.status(201).json({ ok: true, message: 'Category created successfully', category });
    } catch (error) {
      next(error);
    }
  },

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await Category.findAll();
      res.status(200).json({ ok: true, categories });
    } catch (error) {
      next(error);
    }
  },

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await CategoryService.getCategoryById(id);
      if (!category) {
        throw new CustomError('Category not found', 404);
      }
      console.log(category);
      res.status(200).json({ ok: true, category });
    } catch (error) {
      next(error);
    }
  },

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, description, isActive, sortOrder } = await CategoryValidations.UpdateCategoryValidation(req.body);

      const category: Category | undefined | null = await CategoryService.getCategoryById(id);
      if (!category) {
        throw new CustomError('Category not found', 404);
      }

      let newImageUrl = category?.dataValues?.image;

      if (req.file?.filename) {
        newImageUrl = req.file.filename;
        await removeFile(category?.dataValues?.image);
      }
      await category.update({ name, description, image: newImageUrl, isActive, sortOrder });
      res.status(200).json({ ok: true, message: 'Category updated successfully', category });
    } catch (error) {
      next(error);
    }
  },

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category: Category | undefined | null = await CategoryService.getCategoryById(id);
      if (!category) {
        throw new CustomError('Category not found', 404);
      }

      await removeFile(category?.dataValues?.image);
      await CategoryService.removeCategoryById(id);
      res.status(200).json({ ok: true, message: 'Category deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};
