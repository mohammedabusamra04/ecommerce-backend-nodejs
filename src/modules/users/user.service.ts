import { UserRepository } from "./user.repository.js";
//init instance of userRepository
const userRepository = new UserRepository();

export class UserService {

    async createUser(data: {
        name: string;
        email: string;
        phoneNumber: string;
        password: string;
        role?: "user" | "admin";
    }) {

        const existingEmail = await userRepository.findByEmail(data.email);

        if (existingEmail) {
            throw new Error("Email already exists");
        }

        const existingPhone = await userRepository.findByPhoneNumber(data.phoneNumber);

        if (existingPhone) {
            throw new Error("Phone number already exists");
        }
        
        const user = await userRepository.create(data);

        return user;
    }
}