import mongoose, { Schema, Document } from "mongoose";

export interface IVendor extends Document {
    user: mongoose.Types.ObjectId;

    storeName: string;
    description?: string;

    createdAt: Date;
    updatedAt: Date;
}

const vendorSchema = new Schema<IVendor>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        storeName: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
        collection: "vendors",
    }
);

export const Vendor = mongoose.model<IVendor>("Vendor",vendorSchema);