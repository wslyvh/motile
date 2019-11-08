import { IBroker } from "../broker/IBroker";
import logger from "../utils/Logger";
import { ICondition } from "./ICondition";

export class OpenOrders implements ICondition {
  private broker: IBroker;

  constructor(broker: IBroker) {
    this.broker = broker;
  }

  public async ShouldExecute(): Promise<boolean> {
    if (await this.broker.hasOpenOrders()) {
      logger.warn("There are still open orders. Stop execution.");
      return false;
    }

    return true;
  }
}
