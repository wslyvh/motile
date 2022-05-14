import { IBroker } from "../broker/IBroker";
import AppConfig from "../config/config";
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
    console.log("Execute CancelMaxOrders..");

    let orders = await this.broker.getOpenOrders(this.side);
    orders = orders.sort(i => i.Timestamp).reverse();

    const maxOpenOrders = this.maxOrders - 1; // zero-based
    if (orders.length > maxOpenOrders) {
      const toDelete = orders.splice(0, orders.length - maxOpenOrders);
      console.log("Deleting " + toDelete.length + " order(s).");

      for (const order of toDelete) {
        console.log("Delete " + order.Id + ".");
        await this.broker.cancelOrder(order.Id);
      }
    }

    return true;
  }
}
