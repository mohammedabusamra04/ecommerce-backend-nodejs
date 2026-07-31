import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
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

    const payload = verifyAccessToken(token);

    req.user = {
        id: payload.id,
        role: payload.role
    };

    next();
}