import * as winston from "winston";
import AppConfig from "../config/config";

const level = AppConfig.LOG_LEVEL;
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [new winston.transports.Console({ level })]
});

logger.debug(`Logging initialized at '${level}' level`);

export = logger;
