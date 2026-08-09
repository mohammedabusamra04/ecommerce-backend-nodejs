import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { CreateVariantDTO, UpdateVariantDTO } from "./variant.dto.js";
import { variantService } from "../../../config/container.js";
import { AppError } from "../../../utils/AppError.js";

export async function createVariant(
  req: Request<{ productId: string }, {}, CreateVariantDTO>,
  res: Response
): Promise<void> {
  const variant = await variantService.createVariant(
    req.params.productId,
    req.body
  );

  res.success({
    code: StatusCodes.CREATED,
    message: "Variant created successfully",
    data: variant,
  });
}

export async function getVariantsByProduct(
  req: Request<{ productId: string }>,
  res: Response
): Promise<void> {
  const variants = await variantService.getVariantsByProduct(
    req.params.productId
  );

  res.success({
    code: StatusCodes.OK,
    message: "Variants fetched successfully",
    data: variants,
  });
}

export async function getVariantById(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  const variant = await variantService.getVariantById(req.params.id);

  if (!variant) {
    throw AppError.notFound("Variant not found");
  }

  res.success({
    code: StatusCodes.OK,
    message: "Variant fetched successfully",
    data: variant,
  });
}

export async function updateVariant(
  req: Request<{ id: string }, {}, UpdateVariantDTO>,
  res: Response
): Promise<void> {
  const variant = await variantService.updateVariant(
    req.params.id,
    req.body
  );

  res.success({
    code: StatusCodes.OK,
    message: "Variant updated successfully",
    data: variant,
  });
}

export async function deleteVariant(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  const variant = await variantService.deleteVariant(req.params.id);

  res.success({
    code: StatusCodes.OK,
    message: "Variant deleted successfully",
    data: variant,
  });
}

/** Temporary endpoint — only for testing variant stock isolation */
export async function purchaseVariant(
  req: Request<{ id: string }, {}, { quantity?: number }>,
  res: Response
): Promise<void> {
  const quantity = req.body.quantity ?? 1;

  const variant = await variantService.decreaseStock(
    req.params.id,
    quantity
  );

  res.success({
    code: StatusCodes.OK,
    message: "Purchase simulated successfully",
    data: variant,
  });
}
