import { BitmexBroker } from "../broker/BitmexBroker";
import { IBroker } from "../broker/IBroker";
import { MaxPositionSize } from "../conditions/MaxPositionSize";
import { OpenOrdersAmount } from "../conditions/OpenOrdersAmount";
import { PercentagePositionSize } from "../conditions/PercentagePositionSize";
import logger from "../utils/Logger";
import { Strategy } from "./Strategy";

export class SingleOrder extends Strategy {
  private RISK_LEVEL = 0.01;
  private broker: IBroker;

  public constructor() {
    super();

    this.broker = new BitmexBroker();
    this.Conditions.push(new PercentagePositionSize(10, this.broker));
    this.Conditions.push(new OpenOrdersAmount(5, this.broker));
  }

  protected async Execute(): Promise<boolean> {
    logger.info("SingleOrder Execute..");

    const price = await this.broker.price();
    const balance = await this.broker.balance();
    const orderSize = Math.round(balance.USD * this.RISK_LEVEL);
    const spread = price * 0.01;

    logger.info("Creating new trades: " + orderSize + ". SELL @ " + (price + spread) + " BUY @ " + (price - spread));
    await this.broker.createSellOrder(orderSize, price + spread);
    await this.broker.createBuyOrder(orderSize, price - spread);

    logger.info("All done.");
    return true;
  }
}
