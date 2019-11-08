import { ICondition } from "../conditions/ICondition";
import logger from "../utils/Logger";
import { IStrategy } from "./IStrategy";

export class Strategy implements IStrategy {
  public Conditions: ICondition[] = [];

  public async Run(): Promise<boolean> {
    logger.info("Running strategy..");
    for (const condition of this.Conditions) {
      if (!(await condition.ShouldExecute())) {
        return false;
      }
    }

    return await this.Execute();
  }

  protected async Execute(): Promise<boolean> {
    logger.info("Base Execute..");
    return true;
  }
}
