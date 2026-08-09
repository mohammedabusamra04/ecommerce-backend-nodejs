import type { CreateProductDTO, UpdateProductDTO } from "./product.dto.js";
import type { ProductRepository } from "./product.repository.js";

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(data: CreateProductDTO) {
    return this.productRepository.create(data);
  }

  async getProducts() {
    return this.productRepository.findAll();
  }

  async getProductById(id: string) {
    return this.productRepository.findById(id);
  }

  async getProductsByCategory(categoryId: string) {
    return this.productRepository.findByCategory(categoryId);
  }

  async updateProduct(id: string, data: UpdateProductDTO) {
    return this.productRepository.update(id, data);
  }

  async deleteProduct(id: string) {
    return this.productRepository.softDelete(id);
  }
}
