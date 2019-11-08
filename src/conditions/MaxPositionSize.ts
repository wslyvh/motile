import { BitmexBroker } from "../broker/BitmexBroker";
import logger from "../utils/Logger";
import { ICondition } from "./ICondition";

export class MaxPositionSize implements ICondition {
  private MAX_SIZE: number;

  constructor(value: number) {
    this.MAX_SIZE = value;
  }

  public async ShouldExecute(): Promise<boolean> {
    const broker = new BitmexBroker();
    const balance = await broker.balance();
    const position = await broker.position();

    if (position && (position.Size <= -this.MAX_SIZE || position.Size >= this.MAX_SIZE)) {
      logger.warn("Position size is " + position.Size + ". Max allowed: " + this.MAX_SIZE + ". Stop execution.");
      return false;
    }

    return true;
  }
}
