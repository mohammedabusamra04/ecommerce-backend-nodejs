import type { CreateVariantDTO,UpdateVariantDTO } from "./variant.dto.js";
import type { VariantRepository } from "./variant.repository.js";
import type { ProductRepository } from "../products/product.repository.js";
import { AppError } from "../../utils/AppError.js";

export class VariantService {
  constructor(
    private variantRepository: VariantRepository,
    private productRepository: ProductRepository
  ) {}

  async createVariantByProductSlug(
    slug: string,
    data: CreateVariantDTO
  ) {
    const product =
      await this.productRepository.findBySlugRaw(slug);

    if (!product) {
      throw AppError.notFound("Product not found");
    }

    return this.variantRepository.create(
      product._id.toString(),
      data
    );
  }

  async getVariantsByProductSlug(slug: string) {
    const product =
      await this.productRepository.findBySlugRaw(slug);

    if (!product) {
      throw AppError.notFound("Product not found");
    }

    return this.variantRepository.findByProduct(
      product._id.toString()
    );
  }

  async getVariantBySku(sku: string) {
    const variant =
      await this.variantRepository.findBySku(sku);

    if (!variant) {
      throw AppError.notFound("Variant not found");
    }

    return variant;
  }

  async updateVariantBySku(
    sku: string,
    data: UpdateVariantDTO
  ) {
    const variant =
      await this.variantRepository.findBySku(sku);

    if (!variant) {
      throw AppError.notFound("Variant not found");
    }

    return this.variantRepository.updateBySku(
      sku,
      data
    );
  }

  async deleteVariantBySku(sku: string) {
    const variant =
      await this.variantRepository.findBySku(sku);

    if (!variant) {
      throw AppError.notFound("Variant not found");
    }

    return this.variantRepository.softDeleteBySku(sku);
  }

  async decreaseStockBySku(
    sku: string,
    quantity: number
  ) {
    if (quantity < 1) {
      throw AppError.badRequest(
        "Quantity must be at least 1"
      );
    }

    const variant =
      await this.variantRepository.decrementStockBySku(
        sku,
        quantity
      );

    if (!variant) {
      throw AppError.badRequest(
        "Insufficient stock for this variant"
      );
    }

    return variant;
  }

  async restoreStockBySku(
    sku: string,
    quantity: number
  ) {
    if (quantity < 1) {
      throw AppError.badRequest(
        "Quantity must be at least 1"
      );
    }

    const variant =
      await this.variantRepository.incrementStockBySku(
        sku,
        quantity
      );

    if (!variant) {
      throw AppError.notFound("Variant not found");
    }

    return variant;
  }
}