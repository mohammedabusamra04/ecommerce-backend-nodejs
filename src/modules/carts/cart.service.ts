import type { CartRepository } from "./cart.repository.js";

export class CartService {
  constructor( private cartRepository: CartRepository ) {}

  async addOrUpdateCart(
    userId: string,
    variantId: string,
    quantity: number
  ) {
    return this.cartRepository.addOrUpdate(
      userId,
      {
        variantId,
        quantity,
      }
    );
  }
}