import { IBroker } from "../broker/IBroker";
import AppConfig from "../config/config";
import { getOrderSize } from "../utils/orders";
import { IAction } from "./IAction";

export class BuyOrder implements IAction {
  private broker: IBroker;

  public constructor(broker: IBroker) {
    this.broker = broker;
  }

  public async Execute(): Promise<boolean> {
    console.log("Execute BuyOrder..");

    const price = await this.broker.price();
    const balance = await this.broker.balance();
    const orderSize = getOrderSize(balance.USD);
    const spread = price * AppConfig.DEFAULT_SPREAD;

    console.log("Creating new trade: " + orderSize + ". BUY @ " + (price - spread));
    await this.broker.createBuyOrder(orderSize, price - spread);

    return true;
  }
}
