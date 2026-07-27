import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserService } from "./user.service.js";

const userService = new UserService();

export async function createUser(
    req: Request,
    res: Response
): Promise<void> {

    const user = await userService.createUser(req.body);

    res.success({
        code: StatusCodes.CREATED,
        message: "User created successfully",
        data: user
    });
}