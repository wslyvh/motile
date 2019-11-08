import { IBroker } from "../broker/IBroker";
import logger from "../utils/Logger";
import { ICondition } from "./ICondition";

export class PositionRange implements ICondition {
  private RANGE: number;
  private broker: IBroker;

  constructor(value: number, broker: IBroker) {
    this.RANGE = value;
    this.broker = broker;
  }

  public async ShouldExecute(): Promise<boolean> {
    const position = await this.broker.position();
    const price = await this.broker.price();
    const spread = price * this.RANGE;
    const upperBound = price + spread;
    const lowerBound = price - spread;

    if (position && (position.Entry < upperBound && position.Entry > lowerBound)) {
      logger.warn("Current Price within entry range: " + position.Entry + ". Stop execution.");
      return false;
    }

    return true;
  }
}
