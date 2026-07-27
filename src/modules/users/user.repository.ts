import { User } from "./user.module.js";

export class UserRepository {

    async create(data: {
        name: string;
        email: string;
        phoneNumber: string;
        password: string;
        role?: "user" | "admin";
    }) {
        return await User.create(data);
    }

    async findById(id: number) {
        return await User.findByPk(id);
    }

    async findByEmail(email: string) {
        return await User.findOne({
            where: { email }
        });
    }

    async findByPhoneNumber(phoneNumber: string) {
        return await User.findOne({
            where: { phoneNumber }
        });
    }
}