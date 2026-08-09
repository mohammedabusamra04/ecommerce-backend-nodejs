import { Variant } from "./variant.model.js";
import type { CreateVariantDTO, UpdateVariantDTO } from "./variant.dto.js";

export class VariantRepository {
  constructor(private variantModel: typeof Variant) {}

  async create(
    productId: string,
    data: CreateVariantDTO
  ) {
    return this.variantModel.create({
      product: productId,
      ...data,
    });
  }

  async findAll() {
    return this.variantModel.find({
      deletedAt: null,
    });
  }

  async findById(id: string) {
    return this.variantModel.findOne({
      _id: id,
      deletedAt: null,
    });
  }

  async findByProduct(productId: string) {
    return this.variantModel.find({
      product: productId,
      deletedAt: null,
    });
  }

  async update(
    id: string,
    data: UpdateVariantDTO
  ) {
    return this.variantModel.findOneAndUpdate(
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
    return this.variantModel.findOneAndUpdate(
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

  async decrementStock(id: string, quantity: number) {
    return this.variantModel.findOneAndUpdate(
      {
        _id: id,
        deletedAt: null,
        stock: { $gte: quantity },
      },
      {
        $inc: { stock: -quantity },
      },
      {
        new: true,
      }
    );
  }

  async incrementStock(id: string, quantity: number) {
    return this.variantModel.findOneAndUpdate(
      {
        _id: id,
        deletedAt: null,
      },
      {
        $inc: { stock: quantity },
      },
      {
        new: true,
      }
    );
  }
}