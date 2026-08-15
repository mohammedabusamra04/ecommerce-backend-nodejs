import mongoose, { Schema } from "mongoose";

interface IProduct {
  name: string;
  sku: string;
  slug: string;
  description?: string;
  brand: string;
  category: mongoose.Types.ObjectId;
  deletedAt?: Date | null;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "products",

    toJSON: {
  transform: (_doc, ret) => {
    const obj = ret as Partial<IProduct> & {
      _id?: mongoose.Types.ObjectId;
      __v?: number;
    };

    delete obj._id;
    delete obj.__v;
    

    return obj;
  },
},

toObject: {
  transform: (_doc, ret) => {
    const obj = ret as Partial<IProduct> & {
      _id?: mongoose.Types.ObjectId;
      __v?: number;
    };

    delete obj._id;
    delete obj.__v;
    

    return obj;
  },
},
 },
);

export const Product = mongoose.model<IProduct>("Product", productSchema);