import express from "express";
import routes from "./routes/index.js";
import { responseFormatter } from "./middlewares/response.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use(responseFormatter);

app.use("/api", routes);

app.use(errorHandler);

export default app;