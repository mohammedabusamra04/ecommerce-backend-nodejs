import { body } from "express-validator";
import { userService } from "../../config/container.js";
import { AppError } from "../../utils/AppError.js";

export const registerValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be a string")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long"),


    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email")
        .normalizeEmail()
        .custom(async (email) => {

            const existingUser =
                await userService.getUserByEmail(email);

            if (existingUser) {
                throw AppError.conflict(
                    `User with email ${email} already exists`
                );
            }

            return true;
        }),


    body("phoneNumber")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required")
        .isString()
        .withMessage("Phone number must be a string")
        .isLength({ min: 7 })
        .withMessage("Phone number is invalid")
        .custom(async (phoneNumber) => {

            const existingUser =
                await userService.getUserByPhoneNumber(phoneNumber);

            if (existingUser) {
                throw AppError.conflict(
                    `User with phone number ${phoneNumber} already exists`
                );
            }

            return true;
        }),


    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password must be a string")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),


    body("address")
        .notEmpty()
        .withMessage("Address is required")
        .isObject()
        .withMessage("Address must be an object"),


    body("address.city")
        .trim()
        .notEmpty()
        .withMessage("City is required")
        .isLength({ min: 2 })
        .withMessage("City must be at least 2 characters long"),


    body("address.street")
        .trim()
        .notEmpty()
        .withMessage("Street is required")
        .isLength({ min: 2 })
        .withMessage("Street must be at least 2 characters long"),


    body("address.country")
        .trim()
        .notEmpty()
        .withMessage("Country is required")
        .isLength({ min: 2 })
        .withMessage("Country must be at least 2 characters long")
];

export const loginValidator = [

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email")
        .normalizeEmail(),


    body("password")
        .notEmpty()
        .withMessage("Password is required")
];

export const refreshTokenValidator = [

    body("refreshToken")
        .notEmpty()
        .withMessage("Refresh token is required")
];
