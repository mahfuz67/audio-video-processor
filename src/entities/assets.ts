import { Asset, AssetType, PrismaClient, ProcessedAsset } from "@prisma/client";

export class AssetEntity {
  private _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  public async insertAsset(
    filename: string,
    fileType: AssetType
  ): Promise<Asset> {
    const asset = await this._prisma.asset.create({
      data: { filename, fileType },
    });
    return asset;
  }

  public async insertProcessedAsset(
    assetId: string,
    processedFilename: string
  ): Promise<ProcessedAsset> {
    const processedAsset = await this._prisma.processedAsset.create({
      data: {
        filename: processedFilename,
        originalAsset: {
          connect: {
            assetId,
          },
        },
      },
    });
    return processedAsset;
  }

  public async getAssetByAssetId(assetId: string): Promise<Asset> {
    const asset = await this._prisma.asset.findFirst({
      where: {
        assetId,
      },
    });

    if (!asset) throw new Error("Asset not found");

    return asset;
  }
}

export class AssetEntityFactory {
  static bootstrap() {
    const prisma = new PrismaClient();
    const assetEntity = new AssetEntity(prisma);
    return assetEntity;
  }
}
