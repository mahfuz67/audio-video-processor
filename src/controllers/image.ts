import { Request, Response } from "express";
import { ImageService } from "../services/image";

const uploadImage = async (req: Request, res: Response) => {
  const container = req.container;
  const imageService = container.get("service.ImageService") as ImageService;
  try {
    const filename = req.file?.originalname || "";
    const resObj = await imageService.uploadImage(filename);
    res.status(200).json(resObj);
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Error while uploading image",
      data: err,
    });
  }
};

const processImage = async (req: Request, res: Response) => {
  const container = req.container;
  const imageService = container.get("service.ImageService") as ImageService;

  try {
    const { width, height, angle } = req.query as unknown as Partial<
      Record<string, string>
    >;
    parseInt;

    const assetId = req.params.assetId;
    const resObj = await imageService.processImage(assetId, {
      ...(width && { width: parseInt(width) }),
      ...(height && { height: parseInt(height) }),
      ...(angle && { angle: parseInt(angle) }),
    });
    
    res.status(200).json(resObj);
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Error while processing image",
      data: err,
    });
  }
};

export { uploadImage, processImage };
