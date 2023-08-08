import { Router } from "express";
import { downloadFile } from "../controllers";


const router = Router();
const path = "/download";

router.get("/:filename", downloadFile);

export { router, path };
