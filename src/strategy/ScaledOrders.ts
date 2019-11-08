import { BitmexBroker } from "../broker/BitmexBroker";
import { IBroker } from "../broker/IBroker";
import { MaxPositionSize } from "../conditions/MaxPositionSize";
import { OpenOrdersAmount } from "../conditions/OpenOrdersAmount";
import logger from "../utils/Logger";
import { Strategy } from "./Strategy";

export class ScaledOrders extends Strategy {
  private broker: IBroker;

  public constructor() {
    super();

    this.broker = new BitmexBroker();
    this.Conditions.push(new MaxPositionSize(250, this.broker));
    this.Conditions.push(new OpenOrdersAmount(5, this.broker));
  }

  protected async Execute(): Promise<boolean> {
    logger.info("ScaledOrders Execute..");

    const price = await this.broker.price();
    const orderSize = 25;
    const orderAmount = 3;
    const spread = price * 0.001;

    logger.info("Creating new trades..");
    for (let i = 1; i < orderAmount + 1; i++) {
      logger.info("#" + i, "SELL", orderSize, price + spread * i);
      await this.broker.createSellOrder(orderSize, price + spread * i);
    }

    for (let i = 1; i < orderAmount + 1; i++) {
      logger.info("#" + i, "BUY", orderSize, price - spread * i);
      await this.broker.createBuyOrder(orderSize, price - spread * i);
    }

    logger.info("All done.");
    return true;
  }
}
