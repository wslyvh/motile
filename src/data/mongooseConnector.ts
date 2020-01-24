import mongoose from "mongoose";
import AppConfig from "../config/config";
import logger from "../utils/logger";

const connectionOptions = {
  useNewUrlParser: true,
  user: AppConfig.DB_USER,
  pass: AppConfig.DB_PASSWORD
};

export const mongooseConnector = (): void => {
  if (mongoose.connection.readyState > 0) {
    return;
  }

  mongoose.connection.once("open", () => {
    logger.info("Connection to mongodb is opened.");
  });

  mongoose.connection.on("connected", () => {
    logger.info("mongodb is connected.");
  });

  mongoose.connection.on("error", msg => {
    logger.error("mongodb error: ", msg);
  });

  mongoose.connection.on("disconnected", () => {
    setTimeout(() => {
      mongoose.connect(AppConfig.DB_CONNECTION_STRING, connectionOptions);
    }, 10000);
    logger.info("mongodb is disconnected.");
  });

  mongoose.connection.on("reconnected", () => {
    logger.info("mongodb is reconnected.");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      logger.info("mongodb is disconnected through app termination.");
      process.exit(0);
    });
  });

  mongoose.connect(AppConfig.DB_CONNECTION_STRING, connectionOptions);
};
