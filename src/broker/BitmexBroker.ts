import ccxt from "ccxt";
import AppConfig = require("../config/config");
import { IBalance, IBroker, IPosition } from "./IBroker";

export class BitmexBroker implements IBroker {
  private executeMode: boolean = true;
  private client: any;

  public constructor() {
    this.client = new ccxt.bitmex({
      apiKey: AppConfig.BITMEX_KEY,
      secret: AppConfig.BITMEX_SECRET
    });

    // console.log(this.client.has);
  }

  public async price(): Promise<number> {
    const ticker = await this.client.fetch_ticker("BTC/USD");
    return ticker.last;
  }

  public async hasOpenPosition(): Promise<boolean> {
    const positions = await this.client.private_get_position();
    return positions.length && positions.length > 0;
  }

  public async position(): Promise<IPosition | null> {
    const positions = await this.client.private_get_position();
    if (!positions.length && positions.length === 0) {
      return null;
    }

    const btcPosition = positions.find((p: any) => p.symbol === "XBTUSD");
    if (!btcPosition) {
      return null;
    }

    const position: IPosition = {
      Size: btcPosition.foreignNotional,
      Entry: btcPosition.avgEntryPrice,
      Liquidation: btcPosition.liquidationPrice
    };

    return position;
  }

  public async balance(): Promise<IBalance> {
    const fetchBalance = await this.client.fetchBalance();
    const total = fetchBalance.BTC.total;
    const balance: IBalance = {
      USD: (await this.price()) * total,
      BTC: total
    };

    return balance;
  }

  public async hasOpenOrders(): Promise<boolean> {
    const orders = await this.client.fetchOpenOrders();

    return orders.length && orders.length > 0;
  }

  public async createBuyOrder(amount: number, price: number) {
    if (this.executeMode) {
      const result = await this.client.createLimitBuyOrder("BTC/USD", Math.round(amount), Math.round(price));
    }
  }

  public async createSellOrder(amount: number, price: number) {
    const ramount = Math.round(amount);
    const rprice = Math.round(price);

    if (this.executeMode) {
      const result = await this.client.createLimitSellOrder("BTC/USD", ramount, rprice);
    }
  }
}
