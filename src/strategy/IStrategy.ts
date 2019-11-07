export interface IStrategy {
  Run(): Promise<boolean>;
}
