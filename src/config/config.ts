import * as dotenv from "dotenv";

dotenv.config();

const AppConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,

  LOG_DIR: process.env.LOG_DIR || "logs",
  LOG_LEVEL: process.env.NODE_ENV === "production" ? "error" : "debug",

  BITMEX_KEY: process.env.BITMEX_KEY || "",
  BITMEX_SECRET: process.env.BITMEX_SECRET || "",

  EXECUTE_MODE: Boolean(process.env.EXECUTE_MODE) || true,

  DEFAULT_PERCENTAGE_AT_RISK: Number(process.env.DEFAULT_PERCENTAGE_AT_RISK) || 25, // Percentage of total balance / at Stake
  DEFAULT_RISK_LEVEL: Number(process.env.DEFAULT_RISK_LEVEL) || 0.015, // Percentage of total balance / per orderSize
  DEFAULT_MIN_ORDERSIZE: Number(process.env.DEFAULT_MIN_ORDERSIZE) || 25, // Min. order size
  DEFAULT_SPREAD: Number(process.env.DEFAULT_SPREAD) || 0.001, // Percentage from current price
  DEFAULT_RANGE: Number(process.env.DEFAULT_RANGE) || 0.0025, // Percentage from current price

  DEFAULT_ORDER_AMOUNT: Number(process.env.DEFAULT_ORDER_AMOUNT) || 5,
  DEFAULT_OPEN_ORDERS: Number(process.env.DEFAULT_OPEN_ORDERS) || 25
};

if (!AppConfig.BITMEX_KEY && !AppConfig.BITMEX_SECRET) {
  // tslint:disable-next-line: no-console
  console.log("ERROR: BITMEX_KEY or BITMEX_SECRET not correctly set als env variables.");
}

if (AppConfig.DEFAULT_PERCENTAGE_AT_RISK >= 100) {
  // tslint:disable-next-line: no-console
  console.log("WARNING: Entire total balance is at risk. ");
}

export = AppConfig;
