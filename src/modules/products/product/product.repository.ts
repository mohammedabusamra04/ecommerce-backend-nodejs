import { Product } from "./product.model.js";
import type { CreateProductDTO, UpdateProductDTO } from "./product.dto.js";

export class ProductRepository {
  constructor(private productModel: typeof Product) {}

  async create(data: CreateProductDTO) {
    return this.productModel.create(data);
  }

  async findAll() {
    return this.productModel.find({
      deletedAt: null,
    });
  }

  async findById(id: string) {
    return this.productModel.findOne({
      _id: id,
      deletedAt: null,
    });
  }

  async findByCategory(categoryId: string) {
    return this.productModel.find({
      category: categoryId,
      deletedAt: null,
    });
  }

  async update(id: string, data: UpdateProductDTO) {
    return this.productModel.findOneAndUpdate(
      {
        _id: id,
        deletedAt: null,
      },
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async softDelete(id: string) {
    return this.productModel.findOneAndUpdate(
      {
        _id: id,
        deletedAt: null,
      },
      {
        deletedAt: new Date(),
      },
      {
        returnDocument: "after",
      }
    );
  }
}
