import express from "express";
import { userRoutes } from "./modules/users/user.module.js";
import { responseFormatter } from "./middlewares/response.middleware.js";
const app = express();

app.use(express.json());

app.use(responseFormatter);
app.use("/api/users", userRoutes);

export default app;