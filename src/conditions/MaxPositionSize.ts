import { IBroker } from "../broker/IBroker";
import { ICondition } from "./ICondition";

export class MaxPositionSize implements ICondition {
  private MAX_SIZE: number;
  private broker: IBroker;

  constructor(value: number, broker: IBroker) {
    this.MAX_SIZE = value;
    this.broker = broker;
  }

  public async ShouldExecute(): Promise<boolean> {
    const position = await this.broker.position();

    if (position && (position.Size <= -this.MAX_SIZE || position.Size >= this.MAX_SIZE)) {
      console.log("Position size is " + position.Size + ". Max allowed: " + this.MAX_SIZE + ". Stop execution.");
      return false;
    }

    return true;
  }
}
