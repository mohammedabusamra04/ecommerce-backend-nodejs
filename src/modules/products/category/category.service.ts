import { CategoryRepository } from "./category.repository.js";
import type { CreateCategoryDTO,UpdateCategoryDTO } from "./category.dto.js";

export class CategoryService {

    constructor(private categoryRepository: CategoryRepository) {}


    async create(data: CreateCategoryDTO) {
        return this.categoryRepository.create(data);
    }


    async findAll() {
        return this.categoryRepository.findAll();
    }


    async findById(id: string) {
        return this.categoryRepository.findById(id);
    }


    async findByName(name: string) {
        return this.categoryRepository.findByName(name);
    }


    async update(
        id: string,
        data: UpdateCategoryDTO
    ) {
        return this.categoryRepository.update(id, data);
    }


    async softDelete(id: string) {
        return this.categoryRepository.softDelete(id);
    }
}