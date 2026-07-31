import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { RegisterInput, LoginInput, RefreshTokenInput} from "./auth.dto.js";
import { authService } from "../../config/container.js";

export async function register(
    req: Request<{}, {}, RegisterInput>,
    res: Response
): Promise<void> {

    const result = await authService.register(req.body);

    res.success({
        code: StatusCodes.CREATED,
        message: "User registered successfully",
        data: result
    });
}

export async function login(
    req: Request<{}, {}, LoginInput>,
    res: Response
): Promise<void> {

    const result = await authService.login(req.body);

    res.success({
        code: StatusCodes.OK,
        message: "Login successfully",
        data: result
    });
}

export async function refresh(
    req: Request<{}, {}, RefreshTokenInput>,
    res: Response
): Promise<void> {

    const result = await authService.refresh(req.body.refreshToken);

    res.success({
        code: StatusCodes.OK,
        message: "Token refreshed successfully",
        data: result
    });
}

export async function logout(
    req: Request<{}, {}, RefreshTokenInput>,
    res: Response
): Promise<void> {

    await authService.logout(req.body.refreshToken);

    res.success({
        code: StatusCodes.OK,
        message: "Logged out successfully"
    });
}