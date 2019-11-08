import { ICondition } from "../conditions/ICondition";

export interface IStrategy {
  Conditions: ICondition[];
  Run(): Promise<boolean>;
}
