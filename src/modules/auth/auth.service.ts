import type { UserService } from "../users/user.service.js";
import type { AuthRepository } from "./auth.repository.js";
import type { RegisterInput, LoginInput } from "./auth.dto.js";

import { hashValue, compareValue , hashToken } from "../../utils/bcrypt.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken  } from "../../utils/jwt.js";
import { jwtConfig } from "../../config/jwt.js";
import { AppError } from "../../utils/AppError.js";

import ms from "ms";

export class AuthService {

    constructor(
        private userService: UserService,
        private authRepository: AuthRepository
    ) {}

    async register(data: RegisterInput) {

        const hashedPassword = await hashValue(data.password);
    
        const user = await this.userService.createUser(
            {
                ...data,
                password: hashedPassword
            }
        );
    
        const accessToken = generateAccessToken(
            {
                id: user._id.toString(),
                role: user.role
            }
        );
    
        const refreshToken = generateRefreshToken(
            {
                id: user._id.toString()
            });
    
        const tokenHash = hashToken(refreshToken);
    
        const refreshExpires = ms(jwtConfig.refreshToken.expiresIn);

        await this.authRepository.create({
             userId: user._id.toString(),
             tokenHash,
             expiresAt: new Date( Date.now() + refreshExpires)
        });
    
        return {
            user,
            accessToken,
            refreshToken
        };
    }

    async login(data: LoginInput) {
        const user = await this.userService.getUserByEmailWithPassword(data.email);

        if (!user) {
            throw AppError.badRequest("Invalid email or password");
        }

        const isPasswordValid = await compareValue(
            data.password,
            user.password
        );

        if (!isPasswordValid) {
            throw AppError.badRequest("Invalid email or password");
        }

        const accessToken = generateAccessToken(
            {
            id: user._id.toString(),
            role: user.role
            }
        );
        const refreshToken = generateRefreshToken(
            {
        id: user._id.toString()
            }
        );

        const tokenHash = hashToken(refreshToken);

        const refreshExpires = ms(jwtConfig.refreshToken.expiresIn);

        await this.authRepository.create({
            userId: user._id.toString(),
            tokenHash,
            expiresAt: new Date(Date.now() + refreshExpires )
        });

        return {
            user,
            accessToken,
            refreshToken
        };
        };
    
    async refresh(refreshToken: string) {

        const payload = verifyRefreshToken(refreshToken);
    
        const tokenHash = hashToken(refreshToken);
    
        const storedToken = await this.authRepository.findByTokenHash(tokenHash);
    
        if (!storedToken) {
            throw AppError.unauthorized(
                "Invalid refresh token"
            );
        }
    
        await this.authRepository.revokeToken(tokenHash);
    
        const accessToken = generateAccessToken({
                id: payload.id,
                role: payload.role
            });
    
        const newRefreshToken = generateRefreshToken({
                id: payload.id,
                role: payload.role
            });
    
        const newTokenHash = hashToken(newRefreshToken);

        const refreshExpires = ms(jwtConfig.refreshToken.expiresIn);
    
        await this.authRepository.create({
            userId: payload.id,
            tokenHash: newTokenHash,
            expiresAt: new Date( Date.now() + refreshExpires)
        });
    
        return {
            accessToken,
            refreshToken: newRefreshToken
        };
    }

    async logout(refreshToken: string) {

        const tokenHash = hashToken(refreshToken);
    
        const storedToken = await this.authRepository.findByTokenHash(tokenHash);
    
        if (!storedToken) {
            throw AppError.unauthorized(
                "Invalid refresh token"
            );
        }
    
        await this.authRepository.revokeToken(tokenHash);
    
        return {
            message: "Logged out successfully"
        };
    }
    }


