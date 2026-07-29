import express from "express";
import { userRoutes } from "./modules/users/user.routes.js";
import { responseFormatter } from "./middlewares/response.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use(responseFormatter);

app.use("/api/users",userRoutes );

app.use(errorHandler);

export default app;