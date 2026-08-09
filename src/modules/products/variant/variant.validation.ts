import { body, param } from "express-validator";

export const productIdParamValidator = [
  param("productId")
    .isMongoId()
    .withMessage("Invalid product id"),
];

export const variantIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid variant id"),
];

export const createVariantValidator = [
  body("attributes")
    .notEmpty()
    .withMessage("Attributes are required")
    .isObject()
    .withMessage("Attributes must be an object")
    .custom((value) => Object.keys(value).length > 0)
    .withMessage("Attributes cannot be empty"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive integer"),
];

export const updateVariantValidator = [
  body("attributes")
    .optional()
    .isObject()
    .withMessage("Attributes must be an object"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive integer"),
];

// Temporary purchase route for testing variant stock isolation
export const purchaseVariantValidator = [
  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
];
