import { Router } from "express";
import * as cartController from "./cart.controller.js";
import { addOrUpdateCartValidator } from "./cart.validation.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";

export const cartRoutes = Router();

cartRoutes.post(
  "/",
  authMiddleware,
  validate(addOrUpdateCartValidator),
  cartController.addOrUpdateCart
);