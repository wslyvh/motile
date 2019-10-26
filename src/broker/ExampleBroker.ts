import { IBalance, IBroker, IPosition } from "./IBroker";

export class ExampleBroker implements IBroker {
  private PRICE = 8500;
  private BALANCE = 0.2;

  public price(): number {
    return this.PRICE;
  }

  public async position(): Promise<IPosition | null> {
    // const position: IPosition = {
    //   Size: 0,
    //   Value: 0,
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
}
