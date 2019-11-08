import { BitmexBroker } from "../broker/BitmexBroker";
import logger from "../utils/Logger";
import { ICondition } from "./ICondition";

export class OpenOrders implements ICondition {
  public async ShouldExecute(): Promise<boolean> {
    const broker = new BitmexBroker();
    if (await broker.hasOpenOrders()) {
      logger.warn("There are still open orders. Not creating new ones.");
      return false;
    }

    return true;
  }
}
