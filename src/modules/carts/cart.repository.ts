import { Cart } from "./cart.model.js";

interface AddOrUpdateCartData {
  variantId: string;
  quantity: number;
}

export class CartRepository {
  constructor(private cartModel: typeof Cart) {}

  async addOrUpdate(
    userId: string,
    data: AddOrUpdateCartData
  ) {
    const updatedCart = await this.cartModel.findOneAndUpdate(
        {
          user: userId,
          "items.variant": data.variantId,
        },
        {
          $inc: {
            "items.$.quantity": data.quantity,
          },
        },
        {
          new: true,
        }
      );

    if (updatedCart) {
      return updatedCart.populate([
        {
          path: "user",
          select: "name -_id",
        },
        {
          path: "items.variant",
          select: "sku price attributes -_id",
        },
      ]);
    }

    const cart =
      await this.cartModel.findOneAndUpdate(
        {
          user: userId,
        },
        {
          $push: {
            items: {
              variant: data.variantId,
              quantity: data.quantity,
            },
          },
        },
        {
          new: true,
        }
      );

    return cart?.populate([
      {
        path: "user",
        select: "name -_id",
      },
      {
        path: "items.variant",
        select: "sku price attributes -_id",
      },
    ]);
  }
}