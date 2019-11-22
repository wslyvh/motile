export interface IAction {
  Execute(): Promise<boolean>;
}
