import { Router } from "express";
import * as productController from "./product.controller.js";
import {
  createProductValidator,
  updateProductValidator,
  productIdValidator,
} from "./product.validation.js";
import { validate } from "../../../middlewares/validation.middleware.js";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";
import { variantRoutes } from "../variant/variant.routes.js";

export const productRoutes = Router();

productRoutes.post(
  "/",
  authMiddleware,
  validate(createProductValidator),
  productController.createProduct
);

productRoutes.get("/", productController.getProducts);

productRoutes.use("/:productId/variants", variantRoutes);

productRoutes.get(
  "/:id",
  validate(productIdValidator),
  productController.getProductById
);

productRoutes.patch(
  "/:id",
  authMiddleware,
  validate([...productIdValidator, ...updateProductValidator]),
  productController.updateProduct
);

productRoutes.delete(
  "/:id",
  authMiddleware,
  validate(productIdValidator),
  productController.deleteProduct
);
