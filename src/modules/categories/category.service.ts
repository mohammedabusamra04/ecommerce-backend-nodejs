import type { CreateCategoryDTO,UpdateCategoryDTO } from "./category.dto.js";
import type { CategoryRepository } from "./category.repository.js";

export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository
  ) {}

  async create(data: CreateCategoryDTO) {
    return this.categoryRepository.create(data);
  }

  async findAll() {
    return this.categoryRepository.findAll();
  }

  async findBySlug(slug: string) {
    return this.categoryRepository.findBySlug(slug);
  }

  async findByName(name: string) {
    return this.categoryRepository.findByName(name);
  }

  async updateBySlug(
    slug: string,
    data: UpdateCategoryDTO
  ) {
    return this.categoryRepository.updateBySlug(
      slug,
      data
    );
  }

  async softDeleteBySlug(slug: string) {
    return this.categoryRepository.softDeleteBySlug(
      slug
    );
  }
}