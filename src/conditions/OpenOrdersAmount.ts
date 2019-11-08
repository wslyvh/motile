import { BitmexBroker } from "../broker/BitmexBroker";
import logger from "../utils/Logger";
import { ICondition } from "./ICondition";

export class OpenOrdersAmount implements ICondition {
  private MAX_OPEN_ORDERS: number;

  constructor(value: number) {
    this.MAX_OPEN_ORDERS = value;
  }

  public async ShouldExecute(): Promise<boolean> {
    const broker = new BitmexBroker();
    const openOrders = await broker.openOrdersCount();

    if (openOrders >= this.MAX_OPEN_ORDERS) {
      logger.warn("There are " + openOrders + " open orders. Max allowed: " + this.MAX_OPEN_ORDERS + ". Stop execution.");
      return false;
    }

    return true;
  }
}
