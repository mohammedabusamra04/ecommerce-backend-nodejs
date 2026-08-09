import mongoose, { Schema } from "mongoose";

interface IVariant {
  product: mongoose.Types.ObjectId;
  attributes: Map<string, string>;
  price: number;
  stock: number;
  deletedAt?: Date | null;
}


const variantSchema = new Schema<IVariant>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    attributes: {
      type: Map,
      of: String,
      default: {},
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);


export const Variant = mongoose.model<IVariant>("Variant",variantSchema);