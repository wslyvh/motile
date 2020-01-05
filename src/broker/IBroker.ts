export interface IBalance {
  USD: number;
  BTC: number;
}

export interface IPosition {
  Size: number;
  Entry: number;
  Liquidation: number;
}

export enum Side {
  Buy = "Buy",
  Sell = "Sell"
}

export interface IOrder {
  Symbol: string;
  Quantity: number;
  Price: number;
  Side: Side;
  Type: string;
}

export interface IBroker {
  price(): Promise<number>;
  position(): Promise<IPosition | null>;
  balance(): Promise<IBalance>;
  getOpenOrders(): Promise<IOrder[]>;
  hasOpenOrders(): Promise<boolean>;
  openOrdersCount(): Promise<number>;
  cancelOpenOrders(): Promise<void>;
  createBuyOrder(amount: number, price: number): Promise<void>;
  createSellOrder(amount: number, price: number): Promise<void>;
}
