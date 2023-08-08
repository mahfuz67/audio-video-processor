import { AssetEntity } from "../entities";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import { ADDWATERMARKDTO } from "../dtos";
import { APP } from "../config";

ffmpeg.setFfmpegPath(ffmpegStatic!);

export class VideoService {
  private _assetEntity: AssetEntity;

  constructor(assetEntity: AssetEntity) {
    this._assetEntity = assetEntity;
  }
  public async uploadVideo(filename: string): Promise<{
    success: boolean;
    message: string;
    assetId: string;
  }> {
    const { assetId } = await this._assetEntity.insertAsset(filename, "VIDEO");
    return {
      success: true,
      message: "Video uploaded successfully",
      assetId,
    };
  }

  public async extractAudio(assetId: string): Promise<{
    success: boolean;
    message: string;
    downloadUrl: string;
  }> {
    const { filename } = await this._assetEntity.getAssetByAssetId(assetId);

    // Extract the audio from the video
    const inputFilePath = path.join(__dirname, "../../uploads", filename);
    const processedFilename = `processed_${filename.split(".")[0]}.mp3`;
    const outputFilePath = path.join(
      __dirname,
      "../../uploads",
      processedFilename
    );
    // Construct and execute FFmpeg command
    await new Promise((resolve, reject) => {
      ffmpeg(inputFilePath)
        .outputOptions("-ab", "192k")
        .saveToFile(outputFilePath)
        .on("progress", (progress) => {
          if (progress.percent) {
            console.log(`Processing: ${Math.floor(progress.percent)}% done`);
          }
        })
        .on("end", () => {
          console.log("FFmpeg has finished.");
          resolve(true);
        })
        .on("error", (error) => {
          console.error(error);
          reject(error);
        });
    });

    await this._assetEntity.insertProcessedAsset(assetId, processedFilename);

    const downloadUrl = `${APP.BASE_URL}/api/download/${processedFilename}`;

    return {
      success: true,
      message: "Audio extracted successfully",
     downloadUrl,
    };
  }

  public async addWatermark(
    assetId: string,
    {
      text,
      color,
      size,
      position,
    }: { text: string; color?: string; size?: number; position?: string }
  ): Promise<{
    success: boolean;
    message: string;
    downloadUrl: string;
  }> {
    const result = ADDWATERMARKDTO.validate({ text, color, size, position });

    if (result.error) {
      throw new Error("Invalid data provided to add watermark");
    }

    const { filename } = await this._assetEntity.getAssetByAssetId(assetId);

    // Add the watermark to the video
    const inputFilePath = path.join(__dirname, "../../uploads", filename);
    const processedFilename = `processed_${filename}`;
    const outputFilePath = path.join(
      __dirname,
      "../../uploads",
      processedFilename
    );

    // Construct and execute FFmpeg command
    await new Promise((resolve, reject) => {
      ffmpeg(inputFilePath)
        .videoFilters(
          `drawtext=text='${
            text || "mahfuz.com"
          }':x=w-tw-10:y=(h-text_h)/2:fontsize=${size || 22}:fontcolor=${
            color || "white"
          }`
        )
        .saveToFile(outputFilePath)
        .on("progress", (progress) => {
          if (progress.percent) {
            console.log(`Processing: ${Math.floor(progress.percent)}% done`);
          }
        })
        .on("end", () => {
          console.log("FFmpeg has finished.");
          resolve(true);
        })
        .on("error", (error) => {
          console.error(error);
          reject(error);
        });
    });

    await this._assetEntity.insertProcessedAsset(assetId, processedFilename);
    const downloadUrl = `${APP.BASE_URL}/api/download/${processedFilename}`;
    return {
      success: true,
      message: "Watermark added successfully",
      downloadUrl,
    };
  }
}
