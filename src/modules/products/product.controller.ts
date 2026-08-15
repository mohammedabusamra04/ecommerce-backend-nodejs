import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { CreateProductDTO,UpdateProductDTO} from "./product.dto.js";
import { productService } from "../../config/container.js";
import { AppError } from "../../utils/AppError.js";

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

export async function getProductBySku(
  req: Request<{ sku: string }>,
  res: Response
): Promise<void> {
  const product = await productService.getProductBySku(
    req.params.sku
  );

  if (!product) {
    throw AppError.notFound("Product not found");
  }

  res.success({
    code: StatusCodes.OK,
    message: "Product fetched successfully",
    data: product,
  });
}

export async function getProductBySlug(
  req: Request<{ slug: string }>,
  res: Response
): Promise<void> {
  const product = await productService.getProductBySlug(
    req.params.slug
  );

  if (!product) {
    throw AppError.notFound("Product not found");
  }

  res.success({
    code: StatusCodes.OK,
    message: "Product fetched successfully",
    data: product,
  });
}

export async function updateProductBySku(
  req: Request<{ sku: string }, {}, UpdateProductDTO>,
  res: Response
): Promise<void> {
  const product = await productService.updateProductBySku(
    req.params.sku,
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

export async function updateProductBySlug(
  req: Request<{ slug: string }, {}, UpdateProductDTO>,
  res: Response
): Promise<void> {
  const product = await productService.updateProductBySlug(
    req.params.slug,
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

export async function deleteProductBySku(
  req: Request<{ sku: string }>,
  res: Response
): Promise<void> {
  const product = await productService.deleteProductBySku(
    req.params.sku
  );

  if (!product) {
    throw AppError.notFound("Product not found");
  }

  res.success({
    code: StatusCodes.OK,
    message: "Product deleted successfully",
    data: product,
  });
}

export async function deleteProductBySlug(
  req: Request<{ slug: string }>,
  res: Response
): Promise<void> {
  const product = await productService.deleteProductBySlug(
    req.params.slug
  );

  if (!product) {
    throw AppError.notFound("Product not found");
  }

  res.success({
    code: StatusCodes.OK,
    message: "Product deleted successfully",
    data: product,
  });
}