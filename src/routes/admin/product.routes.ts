import { Router } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';
import { upload } from '../../middleware/upload.middleware';
import { ProductController } from '../../controller/product.controller';

const router = Router();

// Create a new product
router.post('/', authMiddleware, upload.array('image', 10), ProductController.createProduct);

// Get all products
router.get('/', authMiddleware, ProductController.getProducts);

//
// // Get a product by ID
router.get('/:id', authMiddleware, ProductController.getProductById);
//
// Update a product by ID
router.put('/:id', authMiddleware, upload.array('image', 10), ProductController.updateProduct);
//
// // Delete a product by ID
router.delete('/:id', authMiddleware, ProductController.deleteProduct);

export default router;
