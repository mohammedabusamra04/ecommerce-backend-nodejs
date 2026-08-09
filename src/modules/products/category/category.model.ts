import mongoose, { Schema } from "mongoose";

interface IAttribute {
  key: string;
  label: string;
  type: "text" | "number" | "select";
  required: boolean;
  options?: string[];
}

interface ICategory {
  name: string;
  description?: string;
  attributes: IAttribute[];
  deletedAt?: Date | null;
}

const attributeSchema = new Schema<IAttribute>(
  {
    key: {
      type: String,
      required: true,
      trim: true,
    },

    label: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["text", "number", "select"],
      default: "text",
    },

    required: {
      type: Boolean,
      default: false,
    },

    options: [String],
  },
  {
    _id: false,
  }
);


const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    attributes: [attributeSchema],

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.index(
  { name: 1 },
  {
    unique: true,
    partialFilterExpression: {
      deletedAt: null,
    },
  }
);

export const Category = mongoose.model<ICategory>("Category",categorySchema);