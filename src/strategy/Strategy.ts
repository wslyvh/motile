import { IAction } from "../actions/IAction";
import { ICondition } from "../conditions/ICondition";
import { IStrategy } from "./IStrategy";

export class Strategy implements IStrategy {
  public Conditions: ICondition[] = [];
  public Actions: IAction[] = [];

  public async Run(): Promise<boolean> {
    console.log("Checking Conditions..");
    for (const condition of this.Conditions) {
      if (!(await condition.ShouldExecute())) {
        return false;
      }
    }

    return await this.Execute();
  }

  protected async Execute(): Promise<boolean> {
    console.log("Executing Actions..");

    for (const action of this.Actions) {
      await action.Execute();
      // Should failed Actions stop further execution?
    }

    return true;
  }
}
