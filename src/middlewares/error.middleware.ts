import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError.js";
import { env } from "../config/env.js";

export function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {

    if (err instanceof AppError) {
        res.fail({
            code: err.statusCode,
            message: err.message
        });

        return;
    }


    if (err instanceof ZodError) {
        res.fail({
            code: StatusCodes.UNPROCESSABLE_ENTITY,
            message: "Validation failed",
            errors: err.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message
            }))
        });

        return;
    }


    console.error(err);

    res.fail({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
        meta:
            env.NODE_ENV === "development" &&
            err instanceof Error
                ? {
                    stack: err.stack
                }
                : {}
    });
}