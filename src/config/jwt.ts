import { env } from "./env.js";
import type { StringValue } from "ms";
import { AppError } from "../utils/AppError.js";


if (!env.ACCESS_TOKEN_SECRET || !env.REFRESH_TOKEN_SECRET) {
    throw new AppError("JWT secrets are missing");
}


export const jwtConfig = {
    accessToken: {
        secret: env.ACCESS_TOKEN_SECRET,
        expiresIn: env.ACCESS_TOKEN_EXPIRES as StringValue
    },

    refreshToken: {
        secret: env.REFRESH_TOKEN_SECRET,
        expiresIn: env.REFRESH_TOKEN_EXPIRES as StringValue
    }
};