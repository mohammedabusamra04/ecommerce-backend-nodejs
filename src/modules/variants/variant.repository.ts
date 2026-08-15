import { Variant } from "./variant.model.js";
import type { CreateVariantDTO,UpdateVariantDTO } from "./variant.dto.js";

export class VariantRepository {
  constructor(private variantModel: typeof Variant) {}

  async create(
    productId: string,
    data: CreateVariantDTO
  ) {
    const variant = await this.variantModel.create({
      product: productId,
      ...data,
    });

    return variant.populate({
      path: "product",
      select: "name -_id",
    });
  }

  async findAll() {
    return this.variantModel
      .find({
        deletedAt: null,
      })
      .populate({
        path: "product",
        select: "name -_id",
      });
  }

  async findById(id: string) {
    return this.variantModel
      .findOne({
        _id: id,
        deletedAt: null,
      })
      .populate({
        path: "product",
        select: "name -_id",
      });
  }

  async findBySku(sku: string) {
    return this.variantModel
      .findOne({
        sku,
        deletedAt: null,
      })
      .populate({
        path: "product",
        select: "name -_id",
      });
  }

  // Used internally when the product ObjectId is needed
  async findBySkuRaw(sku: string) {
    return this.variantModel.findOne({
      sku,
      deletedAt: null,
    });
  }

  async findByProduct(productId: string) {
    return this.variantModel
      .find({
        product: productId,
        deletedAt: null,
      })
      .populate({
        path: "product",
        select: "name -_id",
      });
  }

  async update(
    id: string,
    data: UpdateVariantDTO
  ) {
    return this.variantModel
      .findOneAndUpdate(
        {
          _id: id,
          deletedAt: null,
        },
        data,
        {
          new: true,
          runValidators: true,
        }
      )
      .populate({
        path: "product",
        select: "name -_id",
      });
  }

  async updateBySku(
    sku: string,
    data: UpdateVariantDTO
  ) {
    return this.variantModel
      .findOneAndUpdate(
        {
          sku,
          deletedAt: null,
        },
        data,
        {
          new: true,
          runValidators: true,
        }
      )
      .populate({
        path: "product",
        select: "name -_id",
      });
  }

  async softDelete(id: string) {
    return this.variantModel
      .findOneAndUpdate(
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
      )
      .populate({
        path: "product",
        select: "name -_id",
      });
  }

  async softDeleteBySku(sku: string) {
    return this.variantModel
      .findOneAndUpdate(
        {
          sku,
          deletedAt: null,
        },
        {
          deletedAt: new Date(),
        },
        {
          returnDocument: "after",
        }
      )
      .populate({
        path: "product",
        select: "name -_id",
      });
  }

  async decrementStock(
    id: string,
    quantity: number
  ) {
    return this.variantModel
      .findOneAndUpdate(
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
      )
      .populate({
        path: "product",
        select: "name -_id",
      });
  }

  async decrementStockBySku(
    sku: string,
    quantity: number
  ) {
    return this.variantModel
      .findOneAndUpdate(
        {
          sku,
          deletedAt: null,
          stock: { $gte: quantity },
        },
        {
          $inc: { stock: -quantity },
        },
        {
          new: true,
        }
      )
      .populate({
        path: "product",
        select: "name -_id",
      });
  }

  async incrementStock(
    id: string,
    quantity: number
  ) {
    return this.variantModel
      .findOneAndUpdate(
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
      )
      .populate({
        path: "product",
        select: "name -_id",
      });
  }

  async incrementStockBySku(
    sku: string,
    quantity: number
  ) {
    return this.variantModel
      .findOneAndUpdate(
        {
          sku,
          deletedAt: null,
        },
        {
          $inc: { stock: quantity },
        },
        {
          new: true,
        }
      )
      .populate({
        path: "product",
        select: "name -_id",
      });
  }
}