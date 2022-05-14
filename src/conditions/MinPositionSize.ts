import { IBroker } from "../broker/IBroker";
import { ICondition } from "./ICondition";

export class MinPositionSize implements ICondition {
  private MIN_SIZE: number;
  private broker: IBroker;

  constructor(value: number, broker: IBroker) {
    this.MIN_SIZE = value; // 100
    this.broker = broker;
  }

  public async ShouldExecute(): Promise<boolean> {
    const position = await this.broker.position();

    if (!position) {
      console.log("No position size. Stop execution.");
      return false;
    } else if (position.Size >= -this.MIN_SIZE || position.Size <= this.MIN_SIZE) {
      console.log("Position size is " + position.Size + ". Minimum: " + this.MIN_SIZE + ". Stop execution.");
      return false;
    }

    return true;
  }
}
