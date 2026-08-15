import { Router } from "express";
import * as productController from "./product.controller.js";
import { createProductValidator,updateProductValidator,skuParamValidator,slugParamValidator } from "./product.validation.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { variantRoutes } from "../variants/variant.routes.js";

export const productRoutes = Router();

productRoutes.post(
  "/",
  authMiddleware,
  validate(createProductValidator),
  productController.createProduct
);

productRoutes.get(
  "/",
  productController.getProducts
);

productRoutes.use(
  "/:slug/variants",
  variantRoutes
);

productRoutes.get(
  "/sku/:sku",
  validate(skuParamValidator),
  productController.getProductBySku
);

productRoutes.get(
  "/slug/:slug",
  validate(slugParamValidator),
  productController.getProductBySlug
);

productRoutes.patch(
  "/sku/:sku",
  authMiddleware,
  validate([
    ...skuParamValidator,
    ...updateProductValidator,
  ]),
  productController.updateProductBySku
);

productRoutes.patch(
  "/slug/:slug",
  authMiddleware,
  validate([
    ...slugParamValidator,
    ...updateProductValidator,
  ]),
  productController.updateProductBySlug
);

productRoutes.delete(
  "/sku/:sku",
  authMiddleware,
  validate(skuParamValidator),
  productController.deleteProductBySku
);

productRoutes.delete(
  "/slug/:slug",
  authMiddleware,
  validate(slugParamValidator),
  productController.deleteProductBySlug
);