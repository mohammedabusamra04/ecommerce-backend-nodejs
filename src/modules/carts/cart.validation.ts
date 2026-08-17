import { body } from "express-validator";
import { Variant } from "../variants/variant.model.js";
import { Cart } from "./cart.model.js";
import { AppError } from "../../utils/AppError.js";

export const addOrUpdateCartValidator = [
  body("variantSku")
    .trim()
    .notEmpty()
    .withMessage("Variant SKU is required")
    .custom(async (value) => {
      const variant = await Variant.findOne({
        sku: value,
        deletedAt: null,
      });

      if (!variant) {
        throw AppError.notFound("Variant not found");
      }

      return true;
    }),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1")
    .custom(async (value, { req }) => {
      const variantSku = req.body.variantSku;

      const variant = await Variant.findOne({
        sku: variantSku,
        deletedAt: null,
      });

      if (!variant) {
        return true;
      }

      const cart = await Cart.findOne({
        user: req.user!.id,
      });

      
      if (!cart) {
        if (Number(value) > variant.stock) {
          throw AppError.badRequest(
            `Requested quantity exceeds available stock. Available stock: ${variant.stock}`
          );
        }

        return true;
      }

      const existingItem = cart.items.find(
        (item) =>
          item.variant.toString() ===
          variant._id.toString()
      );

      const currentQuantity =
        existingItem?.quantity ?? 0;

      const requestedTotal =
        currentQuantity + Number(value);

      if (requestedTotal > variant.stock) {
        throw AppError.badRequest(
          `Requested quantity exceeds available stock. Available stock: ${variant.stock}, already in cart: ${currentQuantity}`
        );
      }

      return true;
    }),
];