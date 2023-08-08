import { ContainerBuilder, Definition } from "node-dependency-injection";
import { AssetEntityFactory } from "../entities";
import { ImageService } from "./image";
import { VideoService } from "./video";

// Init services
export async function di(): Promise<ContainerBuilder> {
  const container = new ContainerBuilder();
  const assetEntityDefinition = new Definition();

  assetEntityDefinition.setFactory(AssetEntityFactory, "bootstrap");
  container.setDefinition("service.AssetEntity", assetEntityDefinition);

  container
    .register("service.ImageService", ImageService)
    .addArgument(container.get("service.AssetEntity"));

  container
    .register("service.VideoService", VideoService)
    .addArgument(container.get("service.AssetEntity"));

  return container;
}
