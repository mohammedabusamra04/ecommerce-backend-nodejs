import type { CreateVariantDTO, UpdateVariantDTO } from "./variant.dto.js";
import type { VariantRepository } from "./variant.repository.js";
import type { ProductRepository } from "../product/product.repository.js";
import { AppError } from "../../../utils/AppError.js";

export class VariantService {
  constructor(
    private variantRepository: VariantRepository,
    private productRepository: ProductRepository
  ) {}

  async createVariant(productId: string, data: CreateVariantDTO) {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw AppError.notFound("Product not found");
    }

    return this.variantRepository.create(productId, data);
  }

  async getVariantsByProduct(productId: string) {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw AppError.notFound("Product not found");
    }

    return this.variantRepository.findByProduct(productId);
  }

  async getVariantById(id: string) {
    return this.variantRepository.findById(id);
  }

  async updateVariant(id: string, data: UpdateVariantDTO) {
    const variant = await this.variantRepository.findById(id);

    if (!variant) {
      throw AppError.notFound("Variant not found");
    }

    return this.variantRepository.update(id, data);
  }

  async deleteVariant(id: string) {
    const variant = await this.variantRepository.findById(id);

    if (!variant) {
      throw AppError.notFound("Variant not found");
    }

    return this.variantRepository.softDelete(id);
  }

  async decreaseStock(variantId: string, quantity: number) {
    if (quantity < 1) {
      throw AppError.badRequest("Quantity must be at least 1");
    }

    const variant = await this.variantRepository.decrementStock(
      variantId,
      quantity
    );

    if (!variant) {
      throw AppError.badRequest(
        "Insufficient stock for this variant"
      );
    }

    return variant;
  }

  async restoreStock(variantId: string, quantity: number) {
    return this.variantRepository.incrementStock(variantId, quantity);
  }
}
