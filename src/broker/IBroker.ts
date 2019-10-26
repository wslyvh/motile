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
  price(ticker: string): number;
  position(): IPosition | null;
  balance(): IBalance;
}
