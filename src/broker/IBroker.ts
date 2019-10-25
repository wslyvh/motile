export interface IBroker {
  price(ticker: string): number;
  position(): number;
  balance(): number;
}
