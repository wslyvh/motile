import { IBroker } from "../broker/IBroker";
import { ICondition } from "./ICondition";

export class MinBalance implements ICondition {
  private MIN_SIZE: number;
  private broker: IBroker;

  constructor(value: number, broker: IBroker) {
    this.MIN_SIZE = value;
    this.broker = broker;
  }

  public async ShouldExecute(): Promise<boolean> {
    const balance = await this.broker.balance();

    if (balance.USD <= this.MIN_SIZE) {
      console.log("No sufficient available funds. Min. required balance is " + this.MIN_SIZE + ". Stop execution.");
      return false;
    }

    return true;
  }
}
