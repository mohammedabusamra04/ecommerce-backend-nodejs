import { body, param } from "express-validator";

export const productIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid product id"),
];

export const createProductValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),


  body("description")
    .optional()
    .trim(),


  body("brand")
    .trim()
    .notEmpty()
    .withMessage("Product brand is required"),


  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category id"),
];


export const updateProductValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product name cannot be empty"),


  body("description")
    .optional()
    .trim(),


  body("brand")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product brand cannot be empty"),


  body("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid category id"),
];