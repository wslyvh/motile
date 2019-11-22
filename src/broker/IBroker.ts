export interface IBalance {
  USD: number;
  BTC: number;
}

export interface IPosition {
  Size: number;
  Entry: number;
  Liquidation: number;
}

export interface IBroker {
  price(): Promise<number>;
  position(): Promise<IPosition | null>;
  balance(): Promise<IBalance>;
  hasOpenOrders(): Promise<boolean>;
  openOrdersCount(): Promise<number>;
  cancelOpenOrders(): Promise<void>;
  createBuyOrder(amount: number, price: number): Promise<void>;
  createSellOrder(amount: number, price: number): Promise<void>;
}
