import { Router } from "express";

const router = Router();
const path = "/";

router.get("/", async (_, res) => {
  res.json({
    success: true,
    message: "Application is running",
    data: Date.now(),
  });
});

export { router, path };
