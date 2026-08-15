import { body, param } from "express-validator";
import { Category } from "./category.model.js";
import { AppError } from "../../utils/AppError.js";

export const slugParamValidator = [
  param("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required")
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Invalid slug format")
    .bail()
    .custom(async (slug) => {
      const existingCategory = await Category.findOne({
        slug,
        deletedAt: null,
      });

      if (!existingCategory) {
        throw AppError.notFound("Category not found");
      }

      return true;
    }),
];

export const createCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isString()
    .withMessage("Category name must be a string")
    .custom(async (name) => {
      const existingCategory = await Category.findOne({
        name,
        deletedAt: null,
      });

      if (existingCategory) {
        throw AppError.conflict(
          `Category with name ${name} already exists`
        );
      }

      return true;
    }),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Category slug is required")
    .isString()
    .withMessage("Category slug must be a string")
    .matches(/^[a-z0-9-]+$/)
    .withMessage(
      "Slug must be lowercase and contain only alphanumeric characters and hyphens"
    )
    .custom(async (slug) => {
      const existingCategory = await Category.findOne({
        slug,
        deletedAt: null,
      });

      if (existingCategory) {
        throw AppError.conflict(
          `Category with slug ${slug} already exists`
        );
      }

      return true;
    }),

  body("description")
    .optional()
    .trim()
    .isString()
    .withMessage("Description must be a string"),

  body("attributes")
    .optional()
    .isArray()
    .withMessage("Attributes must be an array"),

  body("attributes.*.key")
    .if(body("attributes").exists())
    .trim()
    .notEmpty()
    .withMessage("Attribute key is required"),

  body("attributes.*.label")
    .if(body("attributes").exists())
    .trim()
    .notEmpty()
    .withMessage("Attribute label is required"),

  body("attributes.*.type")
    .if(body("attributes").exists())
    .isIn(["text", "number", "select"])
    .withMessage(
      "Attribute type must be text, number, or select"
    ),

  body("attributes.*.required")
    .optional()
    .isBoolean()
    .withMessage(
      "Attribute required must be boolean"
    ),

  body("attributes.*.options")
    .optional()
    .isArray()
    .withMessage(
      "Attribute options must be an array"
    ),
];

export const updateCategoryValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category name cannot be empty")
    .isString()
    .withMessage("Category name must be a string")
    .custom(async (name, { req }) => {
      const currentCategory = await Category.findOne({
        slug: req.params?.slug,
        deletedAt: null,
      });

      if (!currentCategory) {
        throw AppError.notFound("Category not found");
      }

      const existingCategory = await Category.findOne({
        name,
        deletedAt: null,
        _id: {
          $ne: currentCategory._id,
        },
      });

      if (existingCategory) {
        throw AppError.conflict(
          `Category with name ${name} already exists`
        );
      }

      return true;
    }),

  body("slug")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category slug cannot be empty")
    .isString()
    .withMessage("Category slug must be a string")
    .matches(/^[a-z0-9-]+$/)
    .withMessage(
      "Slug must be lowercase and contain only alphanumeric characters and hyphens"
    )
    .custom(async (slug) => {
      const existingCategory = await Category.findOne({
        slug,
        deletedAt: null,
      });

      if (existingCategory) {
        throw AppError.conflict(
          `Category with slug ${slug} already exists`
        );
      }

      return true;
    }),

  body("description")
    .optional()
    .trim()
    .isString()
    .withMessage("Description must be a string"),

  body("attributes")
    .optional()
    .isArray()
    .withMessage("Attributes must be an array"),

  body("attributes.*.key")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Attribute key cannot be empty"),

  body("attributes.*.label")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Attribute label cannot be empty"),

  body("attributes.*.type")
    .optional()
    .isIn(["text", "number", "select"])
    .withMessage(
      "Attribute type must be text, number, or select"
    ),

  body("attributes.*.required")
    .optional()
    .isBoolean()
    .withMessage(
      "Attribute required must be boolean"
    ),

  body("attributes.*.options")
    .optional()
    .isArray()
    .withMessage(
      "Attribute options must be an array"
    ),
];