import { Router } from "express";
import * as categoryController from "./category.controller.js";
import { createCategoryValidator,updateCategoryValidator,slugParamValidator } from "./category.validation.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

export const categoryRoutes = Router();

categoryRoutes.post(
  "/",
  authMiddleware,
  validate(createCategoryValidator),
  categoryController.createCategory
);

categoryRoutes.get(
  "/",
  categoryController.getCategories
);

categoryRoutes.get(
  "/slug/:slug",
  validate(slugParamValidator),
  categoryController.getCategoryBySlug
);

categoryRoutes.patch(
  "/slug/:slug",
  authMiddleware,
  validate([
    ...slugParamValidator,
    ...updateCategoryValidator,
  ]),
  categoryController.updateCategoryBySlug
);

categoryRoutes.delete(
  "/slug/:slug",
  authMiddleware,
  validate(slugParamValidator),
  categoryController.deleteCategoryBySlug
);