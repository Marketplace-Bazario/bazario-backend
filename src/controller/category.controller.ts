import { NextFunction, Request, Response } from "express";
import { Category } from "../models/category.model";
import { CustomError } from "../helper/CustomError";
import { CategoryValidations } from "../validation/category.validation";
import { removeFile } from "../helper/removeFile";

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
      res.status(201).json({ ok: true, message: "Category created successfully", category });
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
      const category = await Category.findByPk(id);
      if (!category) {
        throw new CustomError("Category not found", 404);
      }
      res.status(200).json({ ok: true, category });
    } catch (error) {
      next(error);
    }
  },

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, description, image, isActive, sortOrder } = req.body;
      const category = await Category.findByPk(id);
      if (!category) {
        throw new CustomError("Category not found", 404);
      }
      await category.update({ name, description, image, isActive, sortOrder });
      res.status(200).json({ ok: true, message: "Category updated successfully", category });
    } catch (error) {
      next(error);
    }
  },

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) {
        throw new CustomError("Category not found", 404);
      }
      console.log(category?.dataValues?.image);

      await removeFile(category?.dataValues?.image);
      await category.destroy();
      res.status(200).json({ ok: true, message: "Category deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};
