import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRefreshToken extends Document {
    userId: Types.ObjectId;
    tokenHash: string;
    expiresAt: Date;
    revokedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
};

const refreshTokenSchema = new Schema<IRefreshToken>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        tokenHash: {
            type: String,
            required: true,
            unique: true
        },
        expiresAt: {
            type: Date,
            required: true
        },
        revokedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        collection: "refresh_tokens"
    }
);

export const RefreshToken = mongoose.model<IRefreshToken>(
    "RefreshToken",
    refreshTokenSchema
);