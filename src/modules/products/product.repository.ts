import { Product } from "./product.model.js";
import type { Types } from "mongoose";

interface CreateProductData {
  name: string;
  sku: string;
  slug: string;
  description?: string;
  brand: string;
  category: Types.ObjectId;
}

interface UpdateProductData {
  name?: string;
  sku?: string;
  slug?: string;
  description?: string;
  brand?: string;
  category?: Types.ObjectId;
}

export class ProductRepository {
  constructor(private productModel: typeof Product) {}

  async create(data: CreateProductData) {
    const product = await this.productModel.create(data);

    return product.populate("category", "slug -_id");
  }

  async findAll() {
    return this.productModel
      .find({
        deletedAt: null,
      })
      .populate("category", "slug -_id");
  }

  // Used internally when the category ObjectId is needed
  async findByIdRaw(id: string) {
    return this.productModel.findOne({
      _id: id,
      deletedAt: null,
    });
  }

  async findById(id: string) {
    return this.productModel
      .findOne({
        _id: id,
        deletedAt: null,
      })
      .populate("category", "slug -_id");
  }

  // Used internally when the category ObjectId is needed
  async findBySlugRaw(slug: string) {
    return this.productModel.findOne({
      slug,
      deletedAt: null,
    });
  }

  async findBySku(sku: string) {
    return this.productModel
      .findOne({
        sku,
        deletedAt: null,
      })
      .populate("category", "slug -_id");
  }

  async findBySlug(slug: string) {
    return this.productModel
      .findOne({
        slug,
        deletedAt: null,
      })
      .populate("category", "slug -_id");
  }

  async findByCategory(categoryId: string) {
    return this.productModel
      .find({
        category: categoryId,
        deletedAt: null,
      })
      .populate("category", "slug -_id");
  }

  async updateBySku(
    sku: string,
    data: UpdateProductData
  ) {
    const product = await this.productModel.findOneAndUpdate(
      {
        sku,
        deletedAt: null,
      },
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    return product?.populate("category", "slug -_id");
  }

  async updateBySlug(
    slug: string,
    data: UpdateProductData
  ) {
    const product = await this.productModel.findOneAndUpdate(
      {
        slug,
        deletedAt: null,
      },
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    return product?.populate("category", "slug -_id");
  }

  async softDeleteBySku(sku: string) {
    const product = await this.productModel.findOneAndUpdate(
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
    );

    return product?.populate("category", "slug -_id");
  }

  async softDeleteBySlug(slug: string) {
    const product = await this.productModel.findOneAndUpdate(
      {
        slug,
        deletedAt: null,
      },
      {
        deletedAt: new Date(),
      },
      {
        returnDocument: "after",
      }
    );

    return product?.populate("category", "slug -_id");
  }
}