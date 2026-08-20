import mongoose, { Schema, Document } from "mongoose";
import { Cart } from "../carts/cart.model.js";

export interface IUser extends Document {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: "customer" | "admin";
    address: {
        city: string;
        street: string;
        country: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer",
        },
        address: {
            city: {
                type: String,
                required: true
            },

            street: {
                type: String,
                required: true
            },

            country: {
                type: String,
                required: true
            }
        }
    },
    {
        timestamps: true,
        collection: "users",
        toJSON: {
            transform: (_doc, ret) => {
                const obj = ret as Partial<IUser> & { __v?: number };
        
                delete obj.password;
                delete obj.__v;
        
                return obj;
            }
        }
}
);

userSchema.post("save", async function (cart) {
    await Cart.create({
        user: cart._id,
        items: [],
    });
});

export const User = mongoose.model<IUser>("User", userSchema);