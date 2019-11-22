import { IBroker } from "../broker/IBroker";
import AppConfig from "../config/config";
import logger from "../utils/Logger";
import { getOrderSize } from "../utils/orders";
import { IAction } from "./IAction";

export class SellOrder implements IAction {
  private broker: IBroker;

  public constructor(broker: IBroker) {
    this.broker = broker;
  }

  public async Execute(): Promise<boolean> {
    logger.info("Execute SellOrder..");

    const price = await this.broker.price();
    const balance = await this.broker.balance();
    const orderSize = getOrderSize(balance.USD);
    const spread = price * AppConfig.DEFAULT_SPREAD;

    logger.info("Creating new trades: " + orderSize + ". SELL @ " + (price + spread));
    await this.broker.createSellOrder(orderSize, price + spread);

    return true;
  }
}
