import { Cart } from "./cart.model.js";

interface CartItemData {
  variantId: string;
  quantity: number;
}

export class CartRepository {
  constructor(private cartModel: typeof Cart) {}

  async findByUser(userId: string) {
    return this.cartModel
      .findOne({
        user: userId,
      })
      .populate([
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

  async create(
    userId: string,
    data: CartItemData
  ) {
    const cart = await this.cartModel.create({
      user: userId,
      items: [
        {
          variant: data.variantId,
          quantity: data.quantity,
        },
      ],
    });

    return cart.populate([
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

  async addItem(
    userId: string,
    data: CartItemData
  ) {
    const cart = await this.cartModel.findOneAndUpdate(
      {
        user: userId,
        "items.variant": {
          $ne: data.variantId,
        },
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

  async updateItem(
    userId: string,
    data: CartItemData
  ) {
    const cart = await this.cartModel.findOneAndUpdate(
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