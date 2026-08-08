import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes.js";
import { userRoutes } from "../modules/users/user.routes.js";
import { categoryRoutes } from "../modules/products/category/category.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);

export default router;