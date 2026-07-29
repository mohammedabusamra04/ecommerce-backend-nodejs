import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserService } from "./user.service.js";
import type { CreateUserInput, UpdateUserInput} from "./user.dto.js";

const userService = new UserService();

export async function createUser(
    req: Request<{}, {}, CreateUserInput>,
    res: Response
): Promise<void> {

    const user = await userService.createUser(req.body);

    res.success({
        code: StatusCodes.CREATED,
        message: "User created successfully",
        data: user
    });
}

export async function getUsers(
    _req: Request,
    res: Response
): Promise<void> {

    const users = await userService.getUsers();

    res.success({
        code: StatusCodes.OK,
        message: "Users fetched successfully",
        data: users
    });
}

export async function getUserById(
    req: Request<{ id: string }>,
    res: Response
): Promise<void> {

    const user = await userService.getUserById(req.params.id);

    res.success({
        code: StatusCodes.OK,
        message: "User fetched successfully",
        data: user
    });
}

export async function updateUser(
    req: Request<{ id: string }, {}, UpdateUserInput>,
    res: Response
): Promise<void> {

    const user = await userService.updateUser(
        req.params.id,
        req.body
    );

    res.success({
        code: StatusCodes.OK,
        message: "User updated successfully",
        data: user
    });
}

export async function deleteUser(
    req: Request<{ id: string }>,
    res: Response
): Promise<void> {

    const user = await userService.deleteUser(req.params.id);

    res.success({
        code: StatusCodes.OK,
        message: "User deleted successfully",
        data: user
    });
}