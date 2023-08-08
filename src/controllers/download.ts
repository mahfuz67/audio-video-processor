import { Request, Response } from "express";
import path from "path";

const downloadFile = async (req: Request, res: Response) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "../../uploads", filename);

    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.download(filePath);
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Error while downloading file",
      data: err,
    });
  }
};

export { downloadFile };
