import { Router } from "express";
import { CategoryController } from "../../controller/category.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { upload } from "../../middleware/upload.middleware";

const router = Router();

// Create a new category
router.post("/", authMiddleware, upload.single("image"), CategoryController.createCategory);

// Get all categories
router.get("/", authMiddleware, CategoryController.getAllCategories);

// Get a category by ID
router.get("/:id", authMiddleware, CategoryController.getCategoryById);

// Update a category by ID
router.put("/:id", authMiddleware, upload.single("image"), CategoryController.updateCategory);

// Delete a category by ID
router.delete("/:id", authMiddleware, CategoryController.deleteCategory);

export default router;
