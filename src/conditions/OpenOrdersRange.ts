import { IBroker } from "../broker/IBroker";
import { ICondition } from "./ICondition";

export class OpenOrdersRange implements ICondition {
  private RANGE: number;
  private broker: IBroker;

  constructor(value: number, broker: IBroker) {
    this.RANGE = value;
    this.broker = broker;
  }

  public async ShouldExecute(): Promise<boolean> {
    const orders = await this.broker.getOpenOrders();
    const price = await this.broker.price();

    let outOfRange = true;
    orders.forEach(order => {
      const position = order.Price;
      const spread = price * this.RANGE;
      const upperBound = price + spread;
      const lowerBound = price - spread;

      if (position && position < upperBound && position > lowerBound) {
        console.log("Current Price within open order range: " + position + ". Stop execution.");
        outOfRange = false;
      }
    });

    return outOfRange;
  }
}
