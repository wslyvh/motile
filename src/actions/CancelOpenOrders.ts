import { IBroker } from "../broker/IBroker";
import logger from "../utils/Logger";
import { IAction } from "./IAction";

export class CancelOpenOrders implements IAction {
  private broker: IBroker;

  public constructor(broker: IBroker) {
    this.broker = broker;
  }

  public async Execute(): Promise<boolean> {
    logger.info("Execute CancelOpenOrders..");

    await this.broker.cancelOpenOrders();

    return true;
  }
}
