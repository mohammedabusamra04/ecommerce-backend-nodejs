import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { Error as MongooseError } from "mongoose";
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


    else if (err instanceof ZodError) {
        res.fail({
            code: StatusCodes.UNPROCESSABLE_ENTITY,
            message: "Validation failed",
            errors: err.issues
        });
        return;
    }


    else if (err instanceof MongooseError.ValidationError) {
        res.fail({
            code: StatusCodes.UNPROCESSABLE_ENTITY,
            message: "Database validation failed"
        });
        return;
    }


    else if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        err.code === 11000
    ) {
        const field =
            "keyPattern" in err
                ? Object.keys(err.keyPattern as object)[0]
                : "field";
    
        res.fail({
            code: StatusCodes.CONFLICT,
            message: "Duplicate value",
            errors: {
                [field]: `${field} already exists`
            }
        });
    
        return;
    }


    console.error(err);

    res.fail({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
        meta:
            env.NODE_ENV === "development" && err instanceof Error
                ? { stack: err.stack }
                : {}
    });
}