import { BitmexBroker } from "../broker/BitmexBroker";
import { OpenOrdersAmount } from "../conditions/OpenOrdersAmount";
import logger from "../utils/Logger";
import { Strategy } from "./Strategy";

export class SingleOrder extends Strategy {
  public constructor() {
    super();

    this.Conditions.push(new OpenOrdersAmount());
  }

  protected async Execute(): Promise<boolean> {
    logger.info("SingleOrder Execute..");

    const broker = new BitmexBroker();
    const price = await broker.price();
    const orderSize = 25;
    const spread = price * 0.001;

    logger.info("Creating new trades..");
    await broker.createSellOrder(orderSize, price + spread);
    await broker.createBuyOrder(orderSize, price - spread);

    logger.info("All done.");
    return true;
  }
}
