import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

export interface TokenPayload extends JwtPayload {
    id: string;
    role?: string;
}

export function generateAccessToken(payload: TokenPayload) {
    
    return jwt.sign(
        payload,
        jwtConfig.accessToken.secret,
        {
            expiresIn: jwtConfig.accessToken.expiresIn
        } as SignOptions
    );
}

export function generateRefreshToken(payload: TokenPayload) {

    return jwt.sign(
        payload,
        jwtConfig.refreshToken.secret,
        {
            expiresIn: jwtConfig.refreshToken.expiresIn
        } as SignOptions
    );
}

export function verifyAccessToken( token: string): TokenPayload {

    return jwt.verify(
        token,
        jwtConfig.accessToken.secret
    ) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {

    return jwt.verify(
        token,
        jwtConfig.refreshToken.secret
    ) as TokenPayload;
}