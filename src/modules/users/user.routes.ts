import { Router } from "express";
import { createUserSchema } from "./user.schema.js";
import { validate } from "../../middlewares/validation.middleware.js";
import * as userController from "./user.controller.js";

const router = Router();

router.post("/",validate(createUserSchema),userController.createUser);

export default router;