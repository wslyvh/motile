import { IAction } from "../actions/IAction";
import { ICondition } from "../conditions/ICondition";
import logger from "../utils/Logger";
import { IStrategy } from "./IStrategy";

export class Strategy implements IStrategy {
  public Conditions: ICondition[] = [];
  public Actions: IAction[] = [];

  public async Run(): Promise<boolean> {
    logger.info("Checking Conditions..");
    for (const condition of this.Conditions) {
      if (!(await condition.ShouldExecute())) {
        return false;
      }
    }

    return await this.Execute();
  }

  protected async Execute(): Promise<boolean> {
    logger.info("Executing Actions..");

    for (const action of this.Actions) {
      await action.Execute();
      // Should failed Actions stop further execution?
    }

    return true;
  }
}
