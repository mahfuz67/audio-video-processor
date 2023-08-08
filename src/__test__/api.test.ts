import request from "supertest";
import app from "../start";
import path from "path";

describe("Image Endpoints", () => {
  let uploadedAssetId: string;

  it("should upload an image and return an asset Id", async () => {
    const response = await request(app)
      .post("/api/image")
      .attach(
        "image",
        path.join(__dirname, "../../uploads/test_files", "image.jpg")
      );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Image uploaded successfully");
    expect(response.body.assetId).toBeDefined();

    uploadedAssetId = response.body.assetId;
  });

  it("should process an image and return a download URL", async () => {
    const assetId = uploadedAssetId;
    const querParameters = {
      angle: "90",
      height: "300",
      width: "300",
    };

    const response = await request(app)
      .get(`/api/image/${assetId}/process`)
      .query(querParameters);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Image processed successfully");
    expect(response.body.downloadUrl).toMatch(/^(https?:\/\/)/);
  });
});

describe("Video Endpoints", () => {
  let uploadedAssetId: string;

  it("should upload a video and return an asset Id", async () => {
    const response = await request(app)
      .post("/api/video")
      .attach(
        "video",
        path.join(__dirname, "../../uploads/test_files", "video.mp4")
      );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Video uploaded successfully");
    expect(response.body.assetId).toBeDefined();

    uploadedAssetId = response.body.assetId;
  }, 10000);

  it("should add a watermark to a video and return a valid download URL", async () => {
    const assetId = uploadedAssetId;
    const querParameters = {
      color: "white",
      size: "18",
      text: "Watermark Text",
    };

    const response = await request(app)
      .get(`/api/video/${assetId}/watermark`)
      .query(querParameters);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Watermark added successfully");
    expect(response.body.downloadUrl).toMatch(/^(https?:\/\/)/);
  });

  it("should extract sound from a video and return a valid download URL", async () => {
    const assetId = uploadedAssetId;

    const response = await request(app).get(
      `/api/video/${assetId}/extract-sound`
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Audio extracted successfully");
    expect(response.body.downloadUrl).toMatch(/^(https?:\/\/)/);
  });
});
