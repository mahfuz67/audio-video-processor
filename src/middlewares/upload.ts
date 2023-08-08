import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

export type UploadFileType = {
  type: "single" | "array" | "fields";
  fieldName: string | string[];
};

const fileFilter =
  (type: "image" | "video") =>
  (_: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    let allowedMimeTypes: string[] = [];
    if (type === "image") {
      allowedMimeTypes = ["image/jpeg", "image/png"];
    } else {
      allowedMimeTypes = ["video/mp4"];
    }

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only PNG, JPEG, and MP4 files are allowed."
        )
      );
    }
  };

const uploads =
  ({ type, fieldName }: UploadFileType) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const storage = multer.diskStorage({
        destination: (_, __, cb) => {
          cb(null, path.join(__dirname, "../../uploads"));
        },
        filename: function (_, file, cb) {
          cb(null, file.originalname);
        },
      });

      const upload = multer({
        storage,
        fileFilter: fileFilter(fieldName as "image" | "video"),
      });

      let multerMiddleware;
      switch (type) {
        case "single":
          multerMiddleware = upload.single(fieldName as string);
          break;
        case "array":
          multerMiddleware = upload.array(fieldName as string, 10);
          break;
        case "fields":
          multerMiddleware = upload.fields(
            (fieldName as string[]).map((name) => ({ name, maxCount: 10 }))
          );
          break;
      }

      if (multerMiddleware) multerMiddleware(req, res, next);
    } catch (err) {
      res.status(200).json({
        success: false,
        message: "Error while uploading file",
        data: err,
      });
      next();
    }
  };

export { uploads };
