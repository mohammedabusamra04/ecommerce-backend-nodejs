import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes.js";
import { userRoutes } from "../modules/users/user.routes.js";
import { categoryRoutes } from "../modules/products/category/category.routes.js";
import { productRoutes } from "../modules/products/product/product.routes.js";
import { variantByIdRoutes } from "../modules/products/variant/variant.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/variants", variantByIdRoutes);

export default router;
