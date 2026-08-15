import { body, param } from "express-validator";
import { AppError } from "../../utils/AppError.js";
import { Product } from "./product.model.js";
import { Category } from "../categories/category.model.js";

export const skuParamValidator = [
  param("sku")
    .trim()
    .notEmpty()
    .withMessage("SKU is required"),
];

export const slugParamValidator = [
  param("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required")
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Invalid slug format"),
];

export const createProductValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),

  body("sku")
    .trim()
    .notEmpty()
    .withMessage("Product SKU is required")
    .custom(async (value) => {
      const existingProduct = await Product.findOne({
        sku: value,
        deletedAt: null,
      });

      if (existingProduct) {
        throw AppError.conflict("SKU already exists");
      }

      return true;
    }),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Product slug is required")
    .matches(/^[a-z0-9-]+$/)
    .withMessage(
      "Slug must be lowercase and contain only alphanumeric characters and hyphens"
    )
    .custom(async (value) => {
      const existingProduct = await Product.findOne({
        slug: value,
        deletedAt: null,
      });

      if (existingProduct) {
        throw AppError.conflict("Slug already exists");
      }

      return true;
    }),

  body("description")
    .optional()
    .trim(),

  body("brand")
    .trim()
    .notEmpty()
    .withMessage("Product brand is required"),

  body("categorySlug")
    .trim()
    .notEmpty()
    .withMessage("Category slug is required")
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Invalid category slug")
    .custom(async (value) => {
      const category = await Category.findOne({
        slug: value,
        deletedAt: null,
      });

      if (!category) {
        throw AppError.notFound(
          `Category with slug ${value} does not exist`
        );
      }

      return true;
    }),
];

export const updateProductValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product name cannot be empty"),

  body("sku")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product SKU cannot be empty")
    .custom(async (value, { req }) => {
      const query: any = {
        sku: value,
        deletedAt: null,
      };

      if (req.params?.sku) {
        query.sku = {
          $ne: req.params.sku,
        };
      }

      if (req.params?.slug) {
        const currentProduct = await Product.findOne({
          slug: req.params.slug,
          deletedAt: null,
        });

        if (currentProduct) {
          query._id = {
            $ne: currentProduct._id,
          };
        }
      }

      const existingProduct =
        await Product.findOne(query);

      if (existingProduct) {
        throw AppError.conflict(
          "SKU already exists on another product"
        );
      }

      return true;
    }),

  body("slug")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product slug cannot be empty")
    .matches(/^[a-z0-9-]+$/)
    .withMessage(
      "Slug must be lowercase and contain only alphanumeric characters and hyphens"
    )
    .custom(async (value, { req }) => {
      const query: any = {
        slug: value,
        deletedAt: null,
      };

      if (req.params?.slug) {
        query.slug = {
          $ne: req.params.slug,
        };
      }

      if (req.params?.sku) {
        const currentProduct = await Product.findOne({
          sku: req.params.sku,
          deletedAt: null,
        });

        if (currentProduct) {
          query._id = {
            $ne: currentProduct._id,
          };
        }
      }

      const existingProduct =
        await Product.findOne(query);

      if (existingProduct) {
        throw AppError.conflict(
          "Slug already exists on another product"
        );
      }

      return true;
    }),

  body("description")
    .optional()
    .trim(),

  body("brand")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product brand cannot be empty"),

  body("categorySlug")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category slug cannot be empty")
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Invalid category slug")
    .custom(async (value) => {
      const category = await Category.findOne({
        slug: value,
        deletedAt: null,
      });

      if (!category) {
        throw AppError.notFound(
          `Category with slug ${value} does not exist`
        );
      }

      return true;
    }),
];