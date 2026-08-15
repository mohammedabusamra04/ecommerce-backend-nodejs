import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { CreateCategoryDTO,UpdateCategoryDTO } from "./category.dto.js";
import { categoryService } from "../../config/container.js";
import { AppError } from "../../utils/AppError.js";

export async function createCategory(
  req: Request<{}, {}, CreateCategoryDTO>,
  res: Response
): Promise<void> {
  const category = await categoryService.create(req.body);

  res.success({
    code: StatusCodes.CREATED,
    message: "Category created successfully",
    data: category,
  });
}

export async function getCategories(
  _req: Request,
  res: Response
): Promise<void> {
  const categories = await categoryService.findAll();

  res.success({
    code: StatusCodes.OK,
    message: "Categories fetched successfully",
    data: categories,
  });
}

export async function getCategoryBySlug(
  req: Request<{ slug: string }>,
  res: Response
): Promise<void> {
  const category = await categoryService.findBySlug(
    req.params.slug
  );

  if (!category) {
    throw AppError.notFound("Category not found");
  }

  res.success({
    code: StatusCodes.OK,
    message: "Category fetched successfully",
    data: category,
  });
}

export async function updateCategoryBySlug(
  req: Request<{ slug: string }, {}, UpdateCategoryDTO>,
  res: Response
): Promise<void> {
  const category = await categoryService.updateBySlug(
    req.params.slug,
    req.body
  );

  if (!category) {
    throw AppError.notFound("Category not found");
  }

  res.success({
    code: StatusCodes.OK,
    message: "Category updated successfully",
    data: category,
  });
}

export async function deleteCategoryBySlug(
  req: Request<{ slug: string }>,
  res: Response
): Promise<void> {
  const category = await categoryService.softDeleteBySlug(
    req.params.slug
  );

  if (!category) {
    throw AppError.notFound("Category not found");
  }

  res.success({
    code: StatusCodes.OK,
    message: "Category deleted successfully",
    data: category,
  });
}