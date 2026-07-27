import { z } from "zod";

export const userSchema = z.object({
    id: z.number(),

    name: z.string(),

    email: z.string().email(),

    phoneNumber: z.string(),

    password: z.string(),
    
    role: z.enum(["user", "admin"]),

    createdAt: z.date(),

    updatedAt: z.date()
});

export const createUserSchema = userSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
});

