import { NextFunction, Request, Response } from 'express';
import { Product } from '../models/product.model';
import { ProductValidations } from '../validation/product.validation';
import { CustomError } from '../helper/CustomError';
import { filterImages, removeFile, removeFiles } from '../helper/removeFile';
// react + vite + typescript + tailwind + react-hook-form +sooner + react-query + MUI
export const ProductController = {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;

      const { count: totalCount, rows: products } = await Product.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'ASC']],
      });

      res.status(200).json({ ok: true, products, pagination: { totalCount, limit, offset } });
    } catch (error) {
      next(error);
    }
  },
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, price, stock, minStock } = await ProductValidations.ProductValidation(req.body);

      const productImages: any = req.files || [];
      const product = await Product.create({
        name: JSON.parse(name),
        description: JSON.parse(description),
        price,
        stock,
        minStock,
        images: productImages?.map((file: any) => file.filename),
      });

      res.status(201).json({ ok: true, message: 'Product created successfully', product });
    } catch (error) {
      next(error);
    }
  },
  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        throw new CustomError('Product not found', 404);
      }
      res.status(200).json({
        ok: true,
        product,
      });
    } catch (error) {
      next(error);
    }
  },
  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, description, price, stock, minStock, images } = await ProductValidations.ProductValidation(
        req.body,
      );
      const product = await Product.findByPk(id);

      if (!product) {
        throw new CustomError('Product not found', 404);
      }

      let newImages = await filterImages(images, product?.images, req?.files);

      await product.update({
        name: JSON.parse(name),
        description: JSON.parse(description),
        price: price,
        images: newImages,
        stock: stock,
        minStock: minStock,
      });

      res.status(200).json({
        ok: true,
        message: 'Product updated successfully',
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        throw new CustomError('Product not found', 404);
      }
      await removeFiles(product.images);
      await product.destroy();
      res.status(200).json({
        ok: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
