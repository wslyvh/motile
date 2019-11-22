import { IBroker } from "../broker/IBroker";
import logger from "../utils/Logger";
import { ICondition } from "./ICondition";

export class PositionLong implements ICondition {
  private broker: IBroker;

  constructor(broker: IBroker) {
    this.broker = broker;
  }

  public async ShouldExecute(): Promise<boolean> {
    const position = await this.broker.position();

    if (!position) {
      logger.warn("No position. Stop execution.");
      return false;
    }
    if (position.Entry < 0) {
      logger.warn("No LONG position. Stop execution.");
      return false;
    }

    return true;
  }
}
