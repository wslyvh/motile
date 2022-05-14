import { IBroker } from "../broker/IBroker";
import { ICondition } from "./ICondition";

export class PositionShort implements ICondition {
  private broker: IBroker;

  constructor(broker: IBroker) {
    this.broker = broker;
  }

  public async ShouldExecute(): Promise<boolean> {
    const position = await this.broker.position();

    if (!position) {
      console.log("No position. Stop execution.");
      return false;
    }
    if (position.Entry > 0) {
      console.log("No SHORT position. Stop execution.");
      return false;
    }

    return true;
  }
}
