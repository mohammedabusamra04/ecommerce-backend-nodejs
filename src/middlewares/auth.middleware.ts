import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";


export async function authMiddleware(
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<void> {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw AppError.unauthorized(
            "Authorization token is required"
        );
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
        throw AppError.unauthorized(
            "Invalid authorization format"
        );
    }

    try {
        const payload = verifyAccessToken(token);

        req.user = {
            id: payload.id,
            role: payload.role
        };

        next();
    } catch (error) {
        if (
            error instanceof Error &&
            (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError")
        ) {
            throw AppError.unauthorized(
                error.name === "TokenExpiredError"
                    ? "Access token expired. Please login again"
                    : "Invalid access token"
            );
        }

        throw error;
    }
}

