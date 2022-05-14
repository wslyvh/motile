import { IBroker } from "../broker/IBroker";
import { ICondition } from "./ICondition";

export class OpenOrdersAmount implements ICondition {
  private MAX_OPEN_ORDERS: number;
  private broker: IBroker;

  constructor(value: number, broker: IBroker) {
    this.MAX_OPEN_ORDERS = value;
    this.broker = broker;
  }

  public async ShouldExecute(): Promise<boolean> {
    const openOrders = await this.broker.openOrdersCount();

    if (openOrders >= this.MAX_OPEN_ORDERS) {
      console.log("There are " + openOrders + " open orders. Max allowed: " + this.MAX_OPEN_ORDERS + ". Stop execution.");
      return false;
    }

    return true;
  }
}
