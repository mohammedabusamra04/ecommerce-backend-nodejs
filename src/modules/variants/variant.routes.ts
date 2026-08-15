import { Router } from "express";
import * as variantController from "./variant.controller.js";
import { createVariantValidator,updateVariantValidator,productSlugParamValidator,skuParamValidator,purchaseVariantValidator } from "./variant.validation.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

export const variantRoutes = Router({
  mergeParams: true,
});

variantRoutes.post(
  "/",
  authMiddleware,
  validate([
    ...productSlugParamValidator,
    ...createVariantValidator,
  ]),
  variantController.createVariant
);

variantRoutes.get(
  "/",
  validate(productSlugParamValidator),
  variantController.getVariantsByProduct
);

export const variantBySkuRoutes = Router();

variantBySkuRoutes.get(
  "/:sku",
  validate(skuParamValidator),
  variantController.getVariantBySku
);

variantBySkuRoutes.patch(
  "/:sku",
  authMiddleware,
  validate([
    ...skuParamValidator,
    ...updateVariantValidator,
  ]),
  variantController.updateVariantBySku
);

variantBySkuRoutes.delete(
  "/:sku",
  authMiddleware,
  validate(skuParamValidator),
  variantController.deleteVariantBySku
);

variantBySkuRoutes.post(
  "/:sku/purchase",
  validate([
    ...skuParamValidator,
    ...purchaseVariantValidator,
  ]),
  variantController.purchaseVariant
);