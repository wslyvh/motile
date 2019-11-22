import { BuyOrder } from "../actions/BuyOrder";
import { SellOrder } from "../actions/SellOrder";
import { BitmexBroker } from "../broker/BitmexBroker";
import { IBroker } from "../broker/IBroker";
import { OpenOrdersAmount, PercentagePositionSize, PositionRange } from "../conditions";
import AppConfig from "../config/config";
import { Strategy } from "./Strategy";

export class SingleOrder extends Strategy {
  private broker: IBroker;

  public constructor(broker: IBroker = new BitmexBroker()) {
    super();

    this.broker = broker;

    this.Conditions.push(new PercentagePositionSize(AppConfig.DEFAULT_PERCENTAGE_AT_RISK, this.broker));
    this.Conditions.push(new PositionRange(AppConfig.DEFAULT_RANGE, this.broker));
    this.Conditions.push(new OpenOrdersAmount(AppConfig.DEFAULT_OPEN_ORDERS, this.broker));

    this.Actions.push(new SellOrder(this.broker));
    this.Actions.push(new BuyOrder(this.broker));
  }
}
