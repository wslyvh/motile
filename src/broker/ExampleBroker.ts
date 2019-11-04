import { IBalance, IBroker, IPosition } from "./IBroker";

export class ExampleBroker implements IBroker {
  private PRICE = 8500;
  private BALANCE = 0.2;

  public async price(): Promise<number> {
    return this.PRICE;
  }

  public async position(): Promise<IPosition | null> {
    // const position: IPosition = {
    //   Size: 0,
    //   Entry: 0,
    //   Liquidation: 0
    // };

    return null;
  }

  public async balance(): Promise<IBalance> {
    const balance: IBalance = {
      USD: this.PRICE * this.BALANCE,
      BTC: this.BALANCE
    };

    return balance;
  }

  public async hasOpenOrders(): Promise<boolean> {
    return true;
  }

  public async createBuyOrder(amount: number, price: number) {
    // create trade
  }

  public async createSellOrder(amount: number, price: number) {
    // create trade
  }
}
