import ccxt from "ccxt";
import AppConfig = require("../config/config");
import { IBalance, IBroker, IPosition } from "./IBroker";

export class BitmexBroker implements IBroker {
  private client: any;

  public constructor(key: string, secret: string) {
    this.client = new ccxt.bitmex({
      apiKey: key,
      secret
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

  public async openOrdersCount(): Promise<number> {
    const orders = await this.client.fetchOpenOrders();

    return orders.length;
  }

  public async cancelOpenOrders(): Promise<void> {
    const result = await this.client.privateDeleteOrderAll();
  }

  public async createBuyOrder(amount: number, price: number) {
    if (AppConfig.EXECUTE_MODE) {
      const result = await this.client.createLimitBuyOrder("BTC/USD", Math.round(amount), Math.round(price));
    }
  }

  public async createSellOrder(amount: number, price: number) {
    if (AppConfig.EXECUTE_MODE) {
      const result = await this.client.createLimitSellOrder("BTC/USD", Math.round(amount), Math.round(price));
    }
  }
}
