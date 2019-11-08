import { BitmexBroker } from "../broker/BitmexBroker";
import { IBroker } from "../broker/IBroker";
import { MaxPositionSize } from "../conditions/MaxPositionSize";
import { OpenOrdersAmount } from "../conditions/OpenOrdersAmount";
import logger from "../utils/Logger";
import { Strategy } from "./Strategy";

export class SingleOrder extends Strategy {
  private broker: IBroker;

  public constructor() {
    super();

    this.broker = new BitmexBroker();
    this.Conditions.push(new MaxPositionSize(250, this.broker));
    this.Conditions.push(new OpenOrdersAmount(5, this.broker));
  }

  protected async Execute(): Promise<boolean> {
    logger.info("SingleOrder Execute..");

    const price = await this.broker.price();
    const orderSize = 25;
    const spread = price * 0.001;

    logger.info("Creating new trades..");
    await this.broker.createSellOrder(orderSize, price + spread);
    await this.broker.createBuyOrder(orderSize, price - spread);

    logger.info("All done.");
    return true;
  }
}
