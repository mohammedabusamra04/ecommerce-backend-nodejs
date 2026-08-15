import { Category } from "./category.model.js";
import type { CreateCategoryDTO,UpdateCategoryDTO } from "./category.dto.js";

export class CategoryRepository {
  constructor(
    private categoryModel: typeof Category
  ) {}

  async create(data: CreateCategoryDTO) {
    return this.categoryModel.create(data);
  }

  async findAll() {
    return this.categoryModel.find({
      deletedAt: null,
    });
  }

  async findBySlug(slug: string) {
    return this.categoryModel.findOne({
      slug,
      deletedAt: null,
    });
  }

  async findByName(name: string) {
    return this.categoryModel.findOne({
      name,
      deletedAt: null,
    });
  }

  async updateBySlug(
    slug: string,
    data: UpdateCategoryDTO
  ) {
    return this.categoryModel.findOneAndUpdate(
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
  }

  async softDeleteBySlug(slug: string) {
    return this.categoryModel.findOneAndUpdate(
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
  }
}