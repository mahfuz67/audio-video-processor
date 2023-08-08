-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('IMAGE', 'VIDEO');

-- CreateTable
CREATE TABLE "assets" (
    "assetId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "fileType" "AssetType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "processed_assets" (
    "assetId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalAssetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "processed_assets_pkey" PRIMARY KEY ("assetId")
);

-- AddForeignKey
ALTER TABLE "processed_assets" ADD CONSTRAINT "processed_assets_originalAssetId_fkey" FOREIGN KEY ("originalAssetId") REFERENCES "assets"("assetId") ON DELETE RESTRICT ON UPDATE CASCADE;
