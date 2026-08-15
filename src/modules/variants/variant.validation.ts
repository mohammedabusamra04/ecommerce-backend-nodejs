import { body, param } from "express-validator";
import { Variant } from "./variant.model.js";
import { Product } from "../products/product.model.js";
import { AppError } from "../../utils/AppError.js";

export const productSlugParamValidator = [
  param("slug")
    .trim()
    .notEmpty()
    .withMessage("Product slug is required")
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Invalid product slug format"),
];

export const skuParamValidator = [
  param("sku")
    .trim()
    .notEmpty()
    .withMessage("Variant SKU is required"),
];

export const createVariantValidator = [
  body("sku")
    .trim()
    .notEmpty()
    .withMessage("Variant SKU is required")
    .custom(async (value) => {
      const existingVariant = await Variant.findOne({
        sku: value,
        deletedAt: null,
      });

      if (existingVariant) {
        throw AppError.conflict(
          `Variant with SKU ${value} already exists`
        );
      }

      return true;
    }),

  body("attributes")
    .notEmpty()
    .withMessage("Attributes are required")
    .isObject()
    .withMessage("Attributes must be an object")
    .custom((value) => Object.keys(value).length > 0)
    .withMessage("Attributes cannot be empty")
    .custom(async (value, { req }) => {
      const productSlug = req.params?.slug;

      if (!productSlug) {
        return true;
      }

      const product = await Product.findOne({
        slug: productSlug,
        deletedAt: null,
      });

      if (!product) {
        throw AppError.notFound("Product not found");
      }

      const category = await product.populate({
        path: "category",
      });

      const categoryAttributes =
        (category.category as any)?.attributes ?? [];

      const categoryAttributeKeys = new Set(
        categoryAttributes.map(
          (attribute: { key: string }) => attribute.key
        )
      );

      for (const key of Object.keys(value)) {
        if (!categoryAttributeKeys.has(key)) {
          throw AppError.badRequest(
            `Attribute '${key}' is not allowed for this category`
          );
        }
      }

      for (const attribute of categoryAttributes) {
        const attributeValue = value[attribute.key];

        if (
          attribute.required &&
          !attributeValue
        ) {
          throw AppError.badRequest(
            `Attribute '${attribute.key}' is required`
          );
        }

        if (attributeValue === undefined) {
          continue;
        }

        if (attribute.type === "select") {
          if (
            !attribute.options ||
            !attribute.options.includes(attributeValue)
          ) {
            throw AppError.badRequest(
              `Invalid value '${attributeValue}' for attribute '${attribute.key}'`
            );
          }
        }

        if (attribute.type === "number") {
          if (isNaN(Number(attributeValue))) {
            throw AppError.badRequest(
              `Attribute '${attribute.key}' must be a number`
            );
          }
        }
      }

      return true;
    }),

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
    .withMessage("Attributes must be an object")
    .custom(async (value, { req }) => {
      if (!value) {
        return true;
      }

      const sku = req.params?.sku;

      if (!sku) {
        return true;
      }

      const variant = await Variant.findOne({
        sku,
        deletedAt: null,
      });

      if (!variant) {
        throw AppError.notFound("Variant not found");
      }

      const product = await Product.findOne({
        _id: variant.product,
        deletedAt: null,
      });

      if (!product) {
        throw AppError.notFound("Product not found");
      }

      const category = await product.populate({
        path: "category",
      });

      const categoryAttributes =
        (category.category as any)?.attributes ?? [];

      const categoryAttributeKeys = new Set(
        categoryAttributes.map(
          (attribute: { key: string }) => attribute.key
        )
      );

      for (const key of Object.keys(value)) {
        if (!categoryAttributeKeys.has(key)) {
          throw AppError.badRequest(
            `Attribute '${key}' is not allowed for this category`
          );
        }
      }

      for (const attribute of categoryAttributes) {
        const attributeValue = value[attribute.key];

        if (
          attribute.required &&
          !attributeValue
        ) {
          throw AppError.badRequest(
            `Attribute '${attribute.key}' is required`
          );
        }

        if (attributeValue === undefined) {
          continue;
        }

        if (attribute.type === "select") {
          if (
            !attribute.options ||
            !attribute.options.includes(attributeValue)
          ) {
            throw AppError.badRequest(
              `Invalid value '${attributeValue}' for attribute '${attribute.key}'`
            );
          }
        }

        if (attribute.type === "number") {
          if (isNaN(Number(attributeValue))) {
            throw AppError.badRequest(
              `Attribute '${attribute.key}' must be a number`
            );
          }
        }
      }

      return true;
    }),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive integer"),
];

export const purchaseVariantValidator = [
  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
];