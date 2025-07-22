import { NextFunction, Request, Response } from 'express';
import { Product } from '../models/product.model';
import { ProductValidations } from '../validation/product.validation';

export const ProductController = {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;

      const { count: totalCount, rows: products } = await Product.findAndCountAll({
        limit,
        offset,
        order:[[ 'createdAt', 'ASC' ]],
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
        name,
        description,
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
};
