import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { CreateVariantDTO,UpdateVariantDTO } from "./variant.dto.js";
import { variantService } from "../../config/container.js";
import { AppError } from "../../utils/AppError.js";

export async function createVariant(
  req: Request<{ slug: string }, {}, CreateVariantDTO>,
  res: Response
): Promise<void> {
  const variant = await variantService.createVariantByProductSlug(
    req.params.slug,
    req.body
  );

  res.success({
    code: StatusCodes.CREATED,
    message: "Variant created successfully",
    data: variant,
  });
}

export async function getVariantsByProduct(
  req: Request<{ slug: string }>,
  res: Response
): Promise<void> {
  const variants = await variantService.getVariantsByProductSlug(
    req.params.slug
  );

  res.success({
    code: StatusCodes.OK,
    message: "Variants fetched successfully",
    data: variants,
  });
}

export async function getVariantBySku(
  req: Request<{ sku: string }>,
  res: Response
): Promise<void> {
  const variant = await variantService.getVariantBySku(
    req.params.sku
  );

  if (!variant) {
    throw AppError.notFound("Variant not found");
  }

  res.success({
    code: StatusCodes.OK,
    message: "Variant fetched successfully",
    data: variant,
  });
}

export async function updateVariantBySku(
  req: Request<{ sku: string }, {}, UpdateVariantDTO>,
  res: Response
): Promise<void> {
  const variant = await variantService.updateVariantBySku(
    req.params.sku,
    req.body
  );

  res.success({
    code: StatusCodes.OK,
    message: "Variant updated successfully",
    data: variant,
  });
}

export async function deleteVariantBySku(
  req: Request<{ sku: string }>,
  res: Response
): Promise<void> {
  const variant = await variantService.deleteVariantBySku(
    req.params.sku
  );

  res.success({
    code: StatusCodes.OK,
    message: "Variant deleted successfully",
    data: variant,
  });
}

export async function purchaseVariant(
  req: Request<{ sku: string }, {}, { quantity?: number }>,
  res: Response
): Promise<void> {
  const quantity = req.body.quantity ?? 1;

  const variant = await variantService.decreaseStockBySku(
    req.params.sku,
    quantity
  );

  res.success({
    code: StatusCodes.OK,
    message: "Purchase simulated successfully",
    data: variant,
  });
}