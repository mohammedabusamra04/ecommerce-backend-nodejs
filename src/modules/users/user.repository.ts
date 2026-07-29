import { User } from "./user.model.js";
import type { CreateUserInput , UpdateUserInput } from "./user.dto.js";

export class UserRepository {

    constructor(private userModel: typeof User) {}

    async create(data: CreateUserInput) {
        return this.userModel.create(data);
    }

    async findAll() {
        return this.userModel.find();
    }

    async findById(id: string) {
        return this.userModel.findById(id);
    }

    async update(id: string, data: UpdateUserInput) {
        return this.userModel.findByIdAndUpdate(id, data, {
            new: true
        });
    }

    async delete(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }

    async findByEmail(email: string) {
        return this.userModel.findOne({ email });
    }

    async findByPhoneNumber(phoneNumber: string) {
        return this.userModel.findOne({ phoneNumber });
    }
}