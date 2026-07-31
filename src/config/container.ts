import { User } from "../modules/users/user.model.js";
import { UserRepository } from "../modules/users/user.repository.js";
import { UserService } from "../modules/users/user.service.js";
import { RefreshToken } from "../modules/auth/refresh-token.model.js";
import { AuthRepository } from "../modules/auth/auth.repository.js";
import { AuthService } from "../modules/auth/auth.service.js";


export const userRepository = new UserRepository(User);
export const userService = new UserService(userRepository);

export const authRepository = new AuthRepository(RefreshToken);
export const authService = new AuthService(userService,authRepository);