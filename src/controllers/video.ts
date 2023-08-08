import { Request, Response } from "express";
import { VideoService } from "src/services/video";

const uploadVideo = async (req: Request, res: Response) => {
  const container = req.container;
  const videoService = container.get("service.VideoService") as VideoService;
  try {
    const filename = req.file?.originalname || "";
    const resObj = await videoService.uploadVideo(filename);
    res.status(200).json(resObj);
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Error while uploading file",
      data: err,
    });
  }
};

const addWatermark = async (req: Request, res: Response) => {
  const container = req.container;
  const videoService = container.get("service.VideoService") as VideoService;
  try {
    const { text, color, size } = req.query as unknown as Partial<
      Record<string, any>
    >;
    const assetId = req.params.assetId;
    const resObj = await videoService.addWatermark(assetId, {
      text,
      color,
      ...(size && { size: parseInt(size) }),
    });
    res.status(200).json(resObj);
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Error while adding watermark",
      data: err,
    });
  }
};

const extractSound = async (req: Request, res: Response) => {
  const container = req.container;
  const videoService = container.get("service.VideoService") as VideoService;
  try {
    const resObj = await videoService.extractAudio(req.params.assetId);
    res.status(200).json(resObj);
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Error while extracting sound",
      data: err,
    });
  }
};

export { uploadVideo, addWatermark, extractSound };
