import { User } from "./user.model.js";
import type { CreateUserInput , UpdateUserInput } from "./user.dto.js";

export class UserRepository {

    async create(data: CreateUserInput) {
        return User.create(data);
    }
    
    async findAll() {
        return User.find();
    }

    async findById(id: string) {
        return User.findById(id);
    }
    async update(id: string, data: UpdateUserInput) {
        return User.findByIdAndUpdate(
            id,
            data,
            {
                new: true
            }
        );
    }
    async delete(id: string) {
        return User.findByIdAndDelete(id);
    }

    async findByEmail(email: string) {
        return User.findOne({email});
    }

    async findByPhoneNumber(phoneNumber: string) {
        return User.findOne({phoneNumber});
    }
}