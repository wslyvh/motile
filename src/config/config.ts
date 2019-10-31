import * as dotenv from "dotenv";

dotenv.config();

const AppConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,

  LOG_DIR: process.env.LOG_DIR || "logs",
  LOG_LEVEL: process.env.NODE_ENV === "production" ? "error" : "debug"
};

export = AppConfig;
