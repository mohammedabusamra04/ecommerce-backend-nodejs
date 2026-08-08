import { body, param } from "express-validator";
import { categoryService } from "../../../config/container.js";
import { AppError } from "../../../utils/AppError.js";


export const createCategoryValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required")
        .isString()
        .withMessage("Category name must be a string")
        .custom(async (name) => {

            const existingCategory =
                await categoryService.findByName(name);

            if (existingCategory) {
                throw AppError.conflict(
                    `Category with name ${name} already exists`
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

            const existingCategory =
                await categoryService.findByName(name);

            if (
                existingCategory &&
                existingCategory._id.toString() !== req.params?.id
            ) {
                throw AppError.conflict(
                    `Category with name ${name} already exists`
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



export const categoryIdValidator = [

    param("id")
        .notEmpty()
        .withMessage("Category ID is required")
        .isMongoId()
        .withMessage("Invalid category ID")
        .bail()
        .custom(async (id) => {

            const existingCategory =
                await categoryService.findById(id);

            if (!existingCategory) {
                throw AppError.notFound(
                    `Category with id ${id} does not exist`
                );
            }

            return true;
        }),

];