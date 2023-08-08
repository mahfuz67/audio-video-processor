import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";

const handleGlobalError = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (err instanceof MulterError) {
    return res.status(400).json({ error: err.message });
  }

  // Handle other types of errors
  return res.status(500).json({ error: "Internal server error" });
};

export { handleGlobalError };
