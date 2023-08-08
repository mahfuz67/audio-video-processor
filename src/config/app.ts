export const APP = {
    DATABASE_URL:
      process.env.DATABASE_URL ||
      "postgresql://postgres:password@localhost:5432/imageVideoDB?schema=public",
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || "development",
    BASE_URL:
      process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`,
  };
  