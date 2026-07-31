import type { CreateUserInput, UpdateUserInput } from "./user.dto.js";
import type { UserRepository } from "./user.repository.js";

export class UserService {

    constructor(private userRepository: UserRepository) {}

    async createUser(data: CreateUserInput) {
        return this.userRepository.create(data);
    }


    async getUsers() {
        return this.userRepository.findAll();
    }


    async getUserById(id: string) {
        return this.userRepository.findById(id);
    }


    async updateUser(id: string, data: UpdateUserInput) {
        return this.userRepository.update(id, data);
    }


    async deleteUser(id: string) {
        return this.userRepository.delete(id);
    }

    async getUserByEmail(email: string) {
        return this.userRepository.findByEmail(email);
    }

    async getUserByEmailWithPassword(email: string) {
        return this.userRepository.findOneByEmailWithPassword(email);
    }

    async getUserByPhoneNumber(phoneNumber: string) {
        return this.userRepository.findByPhoneNumber(phoneNumber);
    }
}