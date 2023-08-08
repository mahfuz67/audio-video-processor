import { AssetEntity } from "../entities";
import sharp from "sharp";
import { PROCESSIMAGEDTO } from "../dtos";
import path from "path";
import { APP } from "../config";

export class ImageService {
  private _assetEntity: AssetEntity;

  constructor(assetEntity: AssetEntity) {
    this._assetEntity = assetEntity;
  }
  public async uploadImage(filename: string): Promise<{
    success: boolean;
    message: string;
    assetId: string;
  }> {
    const { assetId } = await this._assetEntity.insertAsset(filename, "IMAGE");
    return {
      success: true,
      message: "Image uploaded successfully",
      assetId,
    };
  }

  public async processImage(
    assetId: string,
    {
      width,
      height,
      angle,
    }: Partial<{ width: number; height: number; angle: number }>
  ): Promise<{
    success: boolean;
    message: string;
    downloadUrl: string;
  }> {
    const result = PROCESSIMAGEDTO.validate({ width, height, angle });

    if (result.error) {
      throw new Error("Invalid data provided to process image");
    }

    const { filename } = await this._assetEntity.getAssetByAssetId(assetId);

    // Process the image (resize and rotate)
    const inputFilePath = path.join(__dirname, "../../uploads", filename);
    const processedFilename = `processed_${filename}`;
    const outputFilePath = path.join(
      __dirname,
      "../../uploads",
      processedFilename
    );

    await sharp(inputFilePath)
      .rotate(angle)
      .resize(width, height)
      .toFile(outputFilePath);

    await this._assetEntity.insertProcessedAsset(assetId, processedFilename);
    const downloadUrl = `${APP.BASE_URL}/api/download/${processedFilename}`;
    return {
      success: true,
      message: "Image processed successfully",
      downloadUrl,
    };
  }
}
