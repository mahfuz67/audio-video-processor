import { Router } from "express";
import { uploads } from "../middlewares";
import { processImage, uploadImage } from "../controllers";

const router = Router();
const path = "/image";

router.get("/:assetId/process", processImage);

router.post("/", uploads({ type: "single", fieldName: "image" }), uploadImage);

export { router, path };
