import { User } from "../modules/users/user.model.js";
import { UserRepository } from "../modules/users/user.repository.js";
import { UserService } from "../modules/users/user.service.js";

export const userRepository = new UserRepository(User);
export const userService = new UserService(userRepository);