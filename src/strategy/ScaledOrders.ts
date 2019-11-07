import { BitmexBroker } from "../broker/BitmexBroker";
import logger from "../utils/Logger";
import { IStrategy } from "./IStrategy";

export class ScaledOrders implements IStrategy {
  public async Run(): Promise<void> {
    logger.info("Running ScaledOrders strategy..");

    const broker = new BitmexBroker();
    const price = await broker.price();
    const orderSize = 25;
    const orderAmount = 3;
    const spread = price * 0.002;

    logger.info("Creating SELL orders");
    for (let i = 1; i < orderAmount + 1; i++) {
      logger.info("#" + i, "SELL", orderSize, price + spread * i);
      await broker.createSellOrder(orderSize, price + spread * i);
    }

    logger.info("Creating BUY orders");
    for (let i = 1; i < orderAmount + 1; i++) {
      logger.info("#" + i, "BUY", orderSize, price - spread * i);
      await broker.createBuyOrder(orderSize, price - spread * i);
    }

    logger.info("All done.");
  }
}
