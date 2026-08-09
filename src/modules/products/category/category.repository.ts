import { Category } from "./category.model.js";
import type { CreateCategoryDTO,UpdateCategoryDTO } from "./category.dto.js";

export class CategoryRepository {
  constructor(private categoryModel: typeof Category) {}

  async create(data: CreateCategoryDTO) {
    return this.categoryModel.create(data);
  }

  async findAll() {
    return this.categoryModel.find({
      deletedAt: null,
    });
  }

  async findById(id: string) {
    return this.categoryModel.findOne({
      _id: id,
      deletedAt: null,
    });
  }

  async findByName(name: string) {
    return this.categoryModel.findOne({
        name,
        deletedAt: null,
    });
}

  async update(
    id: string,
    data: UpdateCategoryDTO
  ) {
    return this.categoryModel.findOneAndUpdate(
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
    return this.categoryModel.findOneAndUpdate(
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