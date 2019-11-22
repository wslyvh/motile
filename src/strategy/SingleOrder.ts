import { BitmexBroker } from "../broker/BitmexBroker";
import { IBroker } from "../broker/IBroker";
import { OpenOrdersAmount, PercentagePositionSize, PositionRange } from "../conditions";
import AppConfig from "../config/config";
import logger from "../utils/Logger";
import { getOrderSize } from "../utils/orders";
import { Strategy } from "./Strategy";

export class SingleOrder extends Strategy {
  private broker: IBroker;

  public constructor() {
    super();

    this.broker = new BitmexBroker();
    this.Conditions.push(new PercentagePositionSize(AppConfig.DEFAULT_PERCENTAGE_AT_RISK, this.broker));
    this.Conditions.push(new PositionRange(AppConfig.DEFAULT_RANGE, this.broker));
    this.Conditions.push(new OpenOrdersAmount(AppConfig.DEFAULT_OPEN_ORDERS, this.broker));
  }

  protected async Execute(): Promise<boolean> {
    logger.info("SingleOrder Execute..");

    const price = await this.broker.price();
    const balance = await this.broker.balance();
    const orderSize = getOrderSize(balance.USD);
    const spread = price * AppConfig.DEFAULT_SPREAD;

    logger.info("Creating new trades: " + orderSize + ". SELL @ " + (price + spread) + " BUY @ " + (price - spread));
    await this.broker.createSellOrder(orderSize, price + spread);
    await this.broker.createBuyOrder(orderSize, price - spread);

    logger.info("All done.");
    return true;
  }
}
