import { BitmexBroker } from "../broker/BitmexBroker";
import logger from "../utils/Logger";
import { IStrategy } from "./IStrategy";

export class Sample implements IStrategy {
  public async Run(): Promise<void> {
    logger.info("Running Sample strategy..");

    const broker = new BitmexBroker();
    const price = await broker.price();
    const orderSize = 50;
    const spread = price * 0.001;

    await broker.createSellOrder(orderSize, price + spread);
    await broker.createBuyOrder(orderSize, price - spread);

    logger.info("All done.");
  }
}
