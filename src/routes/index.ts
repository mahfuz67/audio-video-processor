import { router as healthRouter, path as healthPath } from "./health";
import { router as videoRouter, path as videoPath } from "./video";
import { router as imageRouter, path as imagePath } from "./image";
import { router as downloadRouter, path as downloadPath } from "./download";

import { Router } from "express";
import cors from "cors";

const router = Router();
const path = "/api/";

router.use(healthPath, cors(), healthRouter);
router.use(videoPath, cors(), videoRouter);
router.use(imagePath, cors(), imageRouter);
router.use(downloadPath, cors(), downloadRouter);

export { router, path };
