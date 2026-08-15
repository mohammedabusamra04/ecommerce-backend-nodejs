import type { CreateProductDTO,UpdateProductDTO } from "./product.dto.js";
import type { ProductRepository } from "./product.repository.js";
import type { CategoryRepository } from "../categories/category.repository.js";
import { AppError } from "../../utils/AppError.js";

export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository
  ) { }

  async createProduct(data: CreateProductDTO) {
    const category =
      await this.categoryRepository.findBySlug(
        data.categorySlug
      );

    if (!category) {
      throw AppError.notFound("Category not found");
    }

    const { categorySlug, ...productData } = data;

    return this.productRepository.create({
      ...productData,
      category: category._id,
    });
  }

  async getProducts() {
    return this.productRepository.findAll();
  }

  async getProductBySku(sku: string) {
    return this.productRepository.findBySku(sku);
  }

  async getProductBySlug(slug: string) {
    return this.productRepository.findBySlug(slug);
  }

  async getProductsByCategory(categorySlug: string) {
    const category =
      await this.categoryRepository.findBySlug(
        categorySlug
      );

    if (!category) {
      throw AppError.notFound("Category not found");
    }

    return this.productRepository.findByCategory(
      category._id.toString()
    );
  }

  async updateProductBySku(
    sku: string,
    data: UpdateProductDTO
  ) {
    const { categorySlug, ...productData } = data;

    if (categorySlug) {
      const category =
        await this.categoryRepository.findBySlug(
          categorySlug
        );

      if (!category) {
        throw AppError.notFound("Category not found");
      }

      return this.productRepository.updateBySku(
        sku,
        {
          ...productData,
          category: category._id,
        }
      );
    }

    return this.productRepository.updateBySku(
      sku,
      productData
    );
  }

  async updateProductBySlug(
    slug: string,
    data: UpdateProductDTO
  ) {
    const { categorySlug, ...productData } = data;

    if (categorySlug) {
      const category =
        await this.categoryRepository.findBySlug(
          categorySlug
        );

      if (!category) {
        throw AppError.notFound("Category not found");
      }

      return this.productRepository.updateBySlug(
        slug,
        {
          ...productData,
          category: category._id,
        }
      );
    }

    return this.productRepository.updateBySlug(
      slug,
      productData
    );
  }

  async deleteProductBySku(sku: string) {
    return this.productRepository.softDeleteBySku(sku);
  }

  async deleteProductBySlug(slug: string) {
    return this.productRepository.softDeleteBySlug(slug);
  }
}