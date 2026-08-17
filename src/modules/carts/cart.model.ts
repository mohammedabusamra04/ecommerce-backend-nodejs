import mongoose, { Schema } from "mongoose";

interface ICartItem {
  variant: mongoose.Types.ObjectId;
  quantity: number;
}

interface ICart {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
}

const cartItemSchema = new Schema<ICartItem>(
  {
    variant: {
      type: Schema.Types.ObjectId,
      ref: "Variant",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  }
);

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,

    toJSON: {
      transform: (_doc, ret) => {
        const obj = ret as {
          _id?: mongoose.Types.ObjectId;
          __v?: number;
        };

        delete obj._id;
        delete obj.__v;

        return ret;
      },
    },
  }
);

export const Cart = mongoose.model<ICart>("Cart",cartSchema);