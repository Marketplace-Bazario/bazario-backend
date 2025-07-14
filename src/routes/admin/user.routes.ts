import { Router } from "express";
import { UserController } from "../../controller/user.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();

router.post("/login", UserController.login);

router.get("/me", authMiddleware, UserController.getMe);
router.post("/refresh-token", UserController.refreshToken);

export default router;
