export interface ICondition {
  ShouldExecute(): Promise<boolean>;
}
