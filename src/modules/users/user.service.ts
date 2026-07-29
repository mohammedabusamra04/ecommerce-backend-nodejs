import { UserRepository } from "./user.repository.js";
import type {CreateUserInput,UpdateUserInput} from "./user.dto.js";

const userRepository = new UserRepository();

export class UserService {

    async createUser(data: CreateUserInput) {
        return userRepository.create(data);
    }

    async getUsers() {
        return userRepository.findAll();
    }

    async getUserById(id: string) {
        return userRepository.findById(id);
    }

    async updateUser(id: string,data: UpdateUserInput) {
        return userRepository.update(id, data);
    }

    async deleteUser(id: string) {
        return userRepository.delete(id);
    }

}