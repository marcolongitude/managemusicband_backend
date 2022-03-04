import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";

// import router = require('./routes/authenticateUserRoute');

import { router } from '../src/routes';

const app = express();
app.use(express.json());

app.use(cors());
app.use(router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3000, () => console.log("Server is running on port 3000"));
