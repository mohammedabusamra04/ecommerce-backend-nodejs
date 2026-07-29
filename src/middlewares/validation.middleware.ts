import type { NextFunction, Request, Response } from "express";
import { validationResult, type ValidationChain } from "express-validator";

export function validate(
    validations: ValidationChain[]
) {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        for (const validation of validations) {
            await validation.run(req);
        }

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({
                status: false,
                errors: errors.array()
            });
            return;
        }

        next();
    };
}