import { Router } from "express";
import { uploads } from "../middlewares";
import { addWatermark, extractSound, uploadVideo } from "../controllers";

const router = Router();
const path = "/video";

router.get("/:assetId/watermark", addWatermark);

router.get("/:assetId/extract-sound", extractSound);

router.post("/", uploads({ type: "single", fieldName: "video" }), uploadVideo);

export { router, path };
