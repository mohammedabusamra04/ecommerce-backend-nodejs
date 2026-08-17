import type { AddOrUpdateCartDTO } from "./cart.dto.js";
import type { CartRepository } from "./cart.repository.js";
import type { VariantRepository } from "../variants/variant.repository.js";
import { AppError } from "../../utils/AppError.js";

export class CartService {
  constructor(
    private cartRepository: CartRepository,
    private variantRepository: VariantRepository
  ) {}

  async addOrUpdateCart(
    userId: string,
    data: AddOrUpdateCartDTO
  ) {
    const variant = await this.variantRepository.findBySkuRaw(data.variantSku);

    if (!variant) {
      throw AppError.notFound("Variant not found");
    }

    const cart = await this.cartRepository.findByUser(userId);

    const cartItemData = {
      variantId: variant._id.toString(),
      quantity: data.quantity,
    };

    
    if (!cart) {
      return this.cartRepository.create(userId,cartItemData);
    }

    const itemExists = cart.items.some(
      (item) =>
        item.variant.toString() ===
        cartItemData.variantId
    );

    
    if (itemExists) {
      return this.cartRepository.updateItem(userId,cartItemData);
    }

    return this.cartRepository.addItem(userId,cartItemData);
  }
}