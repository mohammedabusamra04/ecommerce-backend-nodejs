import { Router } from "express";
import { createUserValidator , updateUserValidator , userIdValidator } from "./user.validation.js";
import { validate } from "../../middlewares/validation.middleware.js";
import * as userController from "./user.controller.js";
export const userRoutes = Router();

userRoutes.post("/",validate(createUserValidator),userController.createUser);

userRoutes.get("/",userController.getUsers);

userRoutes.get( "/:id",validate(userIdValidator),userController.getUserById);

userRoutes.patch("/:id",validate(userIdValidator),validate(updateUserValidator),userController.updateUser);

userRoutes.delete("/:id", validate(userIdValidator), userController.deleteUser);