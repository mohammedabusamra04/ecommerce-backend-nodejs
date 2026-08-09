import { Router } from "express";
import * as variantController from "./variant.controller.js";
import {
  createVariantValidator,
  updateVariantValidator,
  productIdParamValidator,
  variantIdValidator,
  purchaseVariantValidator,
} from "./variant.validation.js";
import { validate } from "../../../middlewares/validation.middleware.js";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";

export const variantRoutes = Router({ mergeParams: true });

variantRoutes.post(
  "/",
  authMiddleware,
  validate([...productIdParamValidator, ...createVariantValidator]),
  variantController.createVariant
);

variantRoutes.get(
  "/",
  validate(productIdParamValidator),
  variantController.getVariantsByProduct
);

export const variantByIdRoutes = Router();

variantByIdRoutes.get(
  "/:id",
  validate(variantIdValidator),
  variantController.getVariantById
);

variantByIdRoutes.patch(
  "/:id",
  authMiddleware,
  validate([...variantIdValidator, ...updateVariantValidator]),
  variantController.updateVariant
);

variantByIdRoutes.delete(
  "/:id",
  authMiddleware,
  validate(variantIdValidator),
  variantController.deleteVariant
);

// Temporary — for testing that stock decreases per variant only
variantByIdRoutes.post(
  "/:id/purchase",
  validate([...variantIdValidator, ...purchaseVariantValidator]),
  variantController.purchaseVariant
);
