import { IBroker } from "../broker/IBroker";
import { ICondition } from "./ICondition";

export class PercentagePositionSize implements ICondition {
  private PERCENT: number;
  private broker: IBroker;

  constructor(value: number, broker: IBroker) {
    this.PERCENT = value;
    this.broker = broker;
  }

  public async ShouldExecute(): Promise<boolean> {
    const position = await this.broker.position();
    if (position) {
      const balance = await this.broker.balance();
      const maxPositionSize = Math.round((this.PERCENT / 100) * balance.USD);

      if (position.Size >= maxPositionSize) {
        console.log("Position size is " + position.Size + ". Max allowed: " + maxPositionSize + " (" + this.PERCENT + "%). Stop execution.");
        return false;
      }
    }

    return true;
  }
}
