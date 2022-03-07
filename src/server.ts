import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import errorHandler from "./appError/error-handler.middleware";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();
app.use(express.json());

app.use(cors());
app.use(router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errorHandler);

app.listen(3000, () => console.log("Server is running on port 3000"));
