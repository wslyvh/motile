import * as dotenv from "dotenv";

dotenv.config();

const AppConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,

  LOG_DIR: process.env.LOG_DIR || "logs",
  LOG_LEVEL: process.env.NODE_ENV === "production" ? "error" : "debug",

  EXECUTE_MODE: Boolean(process.env.EXECUTE_MODE) || true,

  // Delete defaults from AppConfig => BotConfig
  DEFAULT_PERCENTAGE_AT_RISK: Number(process.env.DEFAULT_PERCENTAGE_AT_RISK) || 200, // Percentage of total balance / at Stake
  DEFAULT_MIN_BALANCE: Number(process.env.DEFAULT_MIN_BALANCE) || 900, // Min. required balance
  DEFAULT_RISK_LEVEL: Number(process.env.DEFAULT_RISK_LEVEL) || 0.015, // Percentage of total balance / per orderSize
  DEFAULT_MIN_ORDERSIZE: Number(process.env.DEFAULT_MIN_ORDERSIZE) || 25, // Min. order size
  DEFAULT_SPREAD: Number(process.env.DEFAULT_SPREAD) || 0.001, // Percentage from current price
  DEFAULT_RANGE: Number(process.env.DEFAULT_RANGE) || 0.0025, // Percentage from current price

  DEFAULT_ORDER_AMOUNT: Number(process.env.DEFAULT_ORDER_AMOUNT) || 3,
  DEFAULT_OPEN_ORDERS: Number(process.env.DEFAULT_OPEN_ORDERS) || 25
};

export = AppConfig;
