import { BitmexBroker } from "../broker/BitmexBroker";
import { IBroker } from "../broker/IBroker";
import { OpenOrdersAmount, PercentagePositionSize, PositionRange } from "../conditions";
import { Constants } from "../config/constants";
import logger from "../utils/Logger";
import { Strategy } from "./Strategy";

export class SingleSellOrder extends Strategy {
  private broker: IBroker;

  public constructor() {
    super();

    this.broker = new BitmexBroker();
    this.Conditions.push(new PercentagePositionSize(Constants.DEFAULT_PERCENTAGE_AT_RISK, this.broker));
    this.Conditions.push(new PositionRange(Constants.DEFAULT_RANGE, this.broker));
    this.Conditions.push(new OpenOrdersAmount(Constants.DEFAULT_OPEN_ORDERS, this.broker));
  }

  protected async Execute(): Promise<boolean> {
    logger.info("SingleSellOrder Execute..");

    const price = await this.broker.price();
    const balance = await this.broker.balance();
    const orderSize = Math.round(balance.USD * Constants.DEFAULT_RISK_LEVEL);
    const spread = price * Constants.DEFAULT_SPREAD;

    logger.info("Creating new trades: " + orderSize + ". SELL @ " + (price + spread));
    await this.broker.createSellOrder(orderSize, price + spread);

    logger.info("All done.");
    return true;
  }
}
