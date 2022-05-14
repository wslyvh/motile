import { IBroker } from "../broker/IBroker";
import { MaxPositionSize, OpenOrdersAmount } from "../conditions";
import AppConfig from "../config/config";
import { getOrderSize } from "../utils/orders";
import { Strategy } from "./Strategy";

export class ScaledOrders extends Strategy {
  private broker: IBroker;

  public constructor(broker: IBroker) {
    super();

    this.broker = broker;
    this.Conditions.push(new MaxPositionSize(250, this.broker));
    this.Conditions.push(new OpenOrdersAmount(AppConfig.DEFAULT_ORDER_AMOUNT, this.broker));
  }

  protected async Execute(): Promise<boolean> {
    console.log("ScaledOrders Execute..");

    const price = await this.broker.price();
    const balance = await this.broker.balance();
    const orderSize = getOrderSize(balance.USD);
    const spread = price * AppConfig.DEFAULT_SPREAD;

    console.log("Creating new trades..");
    for (let i = 1; i < AppConfig.DEFAULT_ORDER_AMOUNT + 1; i++) {
      console.log("#" + i, "SELL", orderSize, price + spread * i);
      await this.broker.createSellOrder(orderSize, price + spread * i);
    }

    for (let i = 1; i < AppConfig.DEFAULT_ORDER_AMOUNT + 1; i++) {
      console.log("#" + i, "BUY", orderSize, price - spread * i);
      await this.broker.createBuyOrder(orderSize, price - spread * i);
    }

    console.log("All done.");
    return true;
  }
}
