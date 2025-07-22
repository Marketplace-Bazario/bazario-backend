import { Router } from 'express';
import { CategoryController } from '../../controller/category.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { upload } from '../../middleware/upload.middleware';
import { ProductController } from '../../controller/product.controller';

const router = Router();

// Create a new product
router.post('/', authMiddleware, upload.array('image', 10), ProductController.createProduct);

// Get all products
router.get('/', authMiddleware, ProductController.getProducts);
//
// // Get a category by ID
// router.get("/:id", authMiddleware, CategoryController.getCategoryById);
//
// // Update a category by ID
// router.put("/:id", authMiddleware, upload.single("image"), CategoryController.updateCategory);
//
// // Delete a category by ID
// router.delete("/:id", authMiddleware, CategoryController.deleteCategory);

export default router;
