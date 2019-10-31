import * as dotenv from "dotenv";

dotenv.config();

const AppConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,

  LOG_DIR: process.env.LOG_DIR || "logs",
  LOG_LEVEL: process.env.NODE_ENV === "production" ? "error" : "debug",

  BITMEX_ID: process.env.BITMEX_ID,
  BITMEX_SECRET: process.env.BITMEX_SECRET
};

if (!AppConfig.BITMEX_ID && !AppConfig.BITMEX_SECRET) {
  // tslint:disable-next-line: no-console
  console.log("BITMEX_ID or BITMEX_SECRET not correctly set als env variables.");
}

export = AppConfig;
