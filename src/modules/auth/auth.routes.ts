import { Router } from "express";
import * as authController from "./auth.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { registerValidator, loginValidator,refreshTokenValidator } from "./auth.validation.js";


export const authRoutes = Router();

authRoutes.post("/register", validate(registerValidator),authController.register);

authRoutes.post("/login",validate(loginValidator),authController.login);

authRoutes.post("/refresh",validate(refreshTokenValidator),authController.refresh);

authRoutes.post("/logout",validate(refreshTokenValidator),authController.logout);