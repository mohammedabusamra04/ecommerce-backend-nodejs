import { Router } from "express";
import * as CategoryController from "./category.controller.js";
import { createCategoryValidator,updateCategoryValidator,categoryIdValidator} from "./category.validation.js";
import { validate } from "../../../middlewares/validation.middleware.js";

export const categoryRoutes = Router();

categoryRoutes.post("/",validate(createCategoryValidator),CategoryController.createCategory);

categoryRoutes.get("/",CategoryController.getCategories);

categoryRoutes.get("/:id",validate(categoryIdValidator),CategoryController.getCategoryById);

categoryRoutes.patch(
    "/:id",
    validate([
        ...categoryIdValidator,
        ...updateCategoryValidator
    ]),
    CategoryController.updateCategory
);

categoryRoutes.delete("/:id",validate(categoryIdValidator),CategoryController.deleteCategory);

