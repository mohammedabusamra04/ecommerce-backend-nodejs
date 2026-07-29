import { z } from "zod";

export const createUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters long"),

    email: z
        .string()
        .trim()
        .email("Must be a valid email address"),

    phoneNumber: z
        .string()
        .trim()
        .min(7, "Phone number is invalid"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),

    role: z
        .enum(["customer", "admin"])
        .optional()
        .default("customer"),

    address: z.object({
        city: z
            .string()
            .trim()
            .min(2, "City is required"),

        street: z
            .string()
            .trim()
            .min(2, "Street is required"),

        country: z
            .string()
            .trim()
            .min(2, "Country is required")
    })
});

export const updateUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters long")
        .optional(),

    email: z
        .string()
        .trim()
        .email("Must be a valid email address")
        .optional(),

    phoneNumber: z
        .string()
        .trim()
        .min(7, "Phone number is invalid")
        .optional(),

    address: z.object({
        city: z
            .string()
            .trim()
            .min(2, "City must be at least 2 characters long")
            .optional(),

        street: z
            .string()
            .trim()
            .min(2, "Street must be at least 2 characters long")
            .optional(),

        country: z
            .string()
            .trim()
            .min(2, "Country must be at least 2 characters long")
            .optional()
    }).optional()
});

export const userIdSchema = z.object({
    id: z
        .string()
        .regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid user id"
        )
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserIdInput = z.infer<typeof userIdSchema>;