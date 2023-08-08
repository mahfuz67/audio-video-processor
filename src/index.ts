import express from "express";
import useragent from "express-useragent";
import cors from "cors";
import compression from "compression";
import { router as baseRouter, path as basePath } from "./routes";
import { ContainerBuilder } from "node-dependency-injection";
import { di } from "./services";
import dotenv from "dotenv";
import { APP } from "./config";
import { handleGlobalError } from "./middlewares";

declare global {
  namespace Express {
    interface Request {
      container: ContainerBuilder;
    }
  }
}

dotenv.config();
const PORT: string | number = APP.PORT;
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use(compression());
app.use(useragent.express());
app.use<string, unknown>("*", cors());

export { app, di, PORT,  baseRouter, basePath, handleGlobalError };




