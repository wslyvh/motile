import { IBroker } from "../broker/IBroker";
import AppConfig from "../config/config";
import logger from "../utils/Logger";
import { IAction } from "./IAction";

export class UpdatePositionClose implements IAction {
  private broker: IBroker;

  public constructor(broker: IBroker) {
    this.broker = broker;
  }

  public async Execute(): Promise<boolean> {
    logger.info("Execute UpdatePositionClose..");

    const position = await this.broker.position();
    if (!position) {
      return false;
    }

    // Cancel Open orders
    await this.broker.cancelOpenOrders();

    const price = Math.abs(position.Entry);
    const orderSize = Math.abs(position.Size);
    const spread = position.Entry * AppConfig.DEFAULT_SPREAD;

    if (position.Size < 0) {
      logger.info("Update Position close: " + orderSize + ". SELL @ " + (price + spread));
      await this.broker.createSellOrder(orderSize, price + spread);
    }
    if (position.Size > 0) {
      logger.info("Update Position close: " + orderSize + ". BUY @ " + (price - spread));
      await this.broker.createBuyOrder(orderSize, price - spread);
    }

    return true;
  }
}
