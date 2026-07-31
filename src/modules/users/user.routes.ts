import { Router } from "express";
import { createUserValidator , updateUserValidator , userIdValidator } from "./user.validation.js";
import { validate } from "../../middlewares/validation.middleware.js";
import * as userController from "./user.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

export const userRoutes = Router();

userRoutes.post("/",validate(createUserValidator),userController.createUser);

userRoutes.get("/",authMiddleware,userController.getUsers);

userRoutes.get( "/:id",authMiddleware,validate(userIdValidator),userController.getUserById);

userRoutes.patch("/:id",authMiddleware,validate(userIdValidator),validate(updateUserValidator),userController.updateUser);

userRoutes.delete("/:id",authMiddleware,validate(userIdValidator), userController.deleteUser);