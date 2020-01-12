import { IBroker } from "../broker/IBroker";
import AppConfig from "../config/config";
import logger from "../utils/Logger";
import { IAction } from "./IAction";

export class CancelMaxOrders implements IAction {
  private broker: IBroker;
  private maxOrders: number;
  private side?: "sell" | "buy";

  public constructor(broker: IBroker, side?: "sell" | "buy") {
    this.broker = broker;
    this.maxOrders = AppConfig.DEFAULT_ORDER_AMOUNT;
    this.side = side;
  }

  public async Execute(): Promise<boolean> {
    logger.info("Execute CancelMaxOrders..");

    let orders = await this.broker.getOpenOrders(this.side);
    orders = orders.sort(i => i.Timestamp).reverse();

    if (orders.length > this.maxOrders) {
      const toDelete = orders.splice(0, orders.length - this.maxOrders);
      logger.info("Deleting " + toDelete.length + " order(s).");

      for (const order of toDelete) {
        logger.info("Delete " + order.Id + ".");
        await this.broker.cancelOrder(order.Id);
      }
    }

    return true;
  }
}
