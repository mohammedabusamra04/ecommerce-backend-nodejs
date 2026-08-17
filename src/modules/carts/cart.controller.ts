import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { AddOrUpdateCartDTO } from "./cart.dto.js";
import { cartService } from "../../config/container.js";

export async function addOrUpdateCart(
  req: Request<{}, {}, AddOrUpdateCartDTO>,
  res: Response
): Promise<void> {
  const cart = await cartService.addOrUpdateCart(
    req.user!.id,
    req.body
  );

  res.success({
    code: StatusCodes.OK,
    message: "Cart updated successfully",
    data: cart,
  });
}