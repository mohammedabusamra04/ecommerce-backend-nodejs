import { Router } from "express";
import { createUserSchema,updateUserSchema,userIdSchema} from "./user.schema.js";
import { validate } from "../../middlewares/validation.middleware.js";
import * as userController from "./user.controller.js";
export const userRoutes = Router();

userRoutes.post("/", validate(createUserSchema), userController.createUser);

userRoutes.get("/", userController.getUsers);

userRoutes.get("/:id",validate(userIdSchema, "params"),userController.getUserById);

userRoutes.patch("/:id", validate(userIdSchema, "params"), validate(updateUserSchema), userController.updateUser);

userRoutes.delete("/:id", validate(userIdSchema, "params"), userController.deleteUser);