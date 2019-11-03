export interface IBalance {
  USD: number;
  BTC: number;
}

export interface IPosition {
  Size: number;
  Value: number;
  Entry: number;
  Liquidation: number;
}

export interface IBroker {
  price(): Promise<number>;
  position(): Promise<IPosition | null>;
  balance(): Promise<IBalance>;
  createBuyOrder(amount: number, price: number): void;
  createSellOrder(amount: number, price: number): void;
}
