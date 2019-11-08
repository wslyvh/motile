import { BitmexBroker } from "../broker/BitmexBroker";
import { IBroker } from "../broker/IBroker";
import { MaxPositionSize } from "../conditions/MaxPositionSize";
import { OpenOrdersAmount } from "../conditions/OpenOrdersAmount";
import { Constants } from "../config/constants";
import logger from "../utils/Logger";
import { Strategy } from "./Strategy";

export class ScaledOrders extends Strategy {
  private broker: IBroker;

  public constructor() {
    super();

    this.broker = new BitmexBroker();
    this.Conditions.push(new MaxPositionSize(250, this.broker));
    this.Conditions.push(new OpenOrdersAmount(Constants.DEFAULT_ORDER_AMOUNT, this.broker));
  }

  protected async Execute(): Promise<boolean> {
    logger.info("ScaledOrders Execute..");

    const price = await this.broker.price();
    const balance = await this.broker.balance();
    const orderSize = Math.round(balance.USD * Constants.DEFAULT_RISK_LEVEL);
    const spread = price * Constants.DEFAULT_SPREAD;

    logger.info("Creating new trades..");
    for (let i = 1; i < Constants.DEFAULT_ORDER_AMOUNT + 1; i++) {
      logger.info("#" + i, "SELL", orderSize, price + spread * i);
      await this.broker.createSellOrder(orderSize, price + spread * i);
    }

    for (let i = 1; i < Constants.DEFAULT_ORDER_AMOUNT + 1; i++) {
      logger.info("#" + i, "BUY", orderSize, price - spread * i);
      await this.broker.createBuyOrder(orderSize, price - spread * i);
    }

    logger.info("All done.");
    return true;
  }
}
