import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { CreateProductDTO, UpdateProductDTO } from "./product.dto.js";
import { productService } from "../../../config/container.js";
import { AppError } from "../../../utils/AppError.js";

export async function createProduct(
  req: Request<{}, {}, CreateProductDTO>,
  res: Response
): Promise<void> {
  const product = await productService.createProduct(req.body);

  res.success({
    code: StatusCodes.CREATED,
    message: "Product created successfully",
    data: product,
  });
}

export async function getProducts(
  _req: Request,
  res: Response
): Promise<void> {
  const products = await productService.getProducts();

  res.success({
    code: StatusCodes.OK,
    message: "Products fetched successfully",
    data: products,
  });
}

export async function getProductById(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  const product = await productService.getProductById(req.params.id);

  if (!product) {
    throw AppError.notFound("Product not found");
  }

  res.success({
    code: StatusCodes.OK,
    message: "Product fetched successfully",
    data: product,
  });
}

export async function updateProduct(
  req: Request<{ id: string }, {}, UpdateProductDTO>,
  res: Response
): Promise<void> {
  const product = await productService.updateProduct(
    req.params.id,
    req.body
  );

  if (!product) {
    throw AppError.notFound("Product not found");
  }

  res.success({
    code: StatusCodes.OK,
    message: "Product updated successfully",
    data: product,
  });
}

export async function deleteProduct(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  const product = await productService.deleteProduct(req.params.id);

  if (!product) {
    throw AppError.notFound("Product not found");
  }

  res.success({
    code: StatusCodes.OK,
    message: "Product deleted successfully",
    data: product,
  });
}
