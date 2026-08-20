import type { TokenPayload } from "../utils/jwt.js";
import type { Variant } from "../modules/variants/variant.model.js";

declare global {
    namespace Express {
        interface Response {
            success<T = unknown>(
                options?: {
                    code?: number;
                    message?: string;
                    data?: T;
                    meta?: Record<string, unknown>;
                }
            ): Response;

            fail(
                options?: {
                    code?: number;
                    message?: string;
                    errors?: unknown;
                    meta?: Record<string, unknown>;
                }
            ): Response;
        }

        interface Request {
            user?: TokenPayload;
            variant?: Variant;
        }
    }
}

export {};