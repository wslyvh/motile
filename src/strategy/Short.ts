import { CancelMaxOrders, SellOrder } from "../actions";
import { IBroker } from "../broker/IBroker";
import { MinBalance, OpenOrdersRange, PercentagePositionSize, PositionRange } from "../conditions";
import AppConfig from "../config/config";
import { Strategy } from "./Strategy";

export class Short extends Strategy {
  private broker: IBroker;

  public constructor(broker: IBroker) {
    super();

    this.broker = broker;

    // CONDITIONS
    this.Conditions.push(new MinBalance(AppConfig.DEFAULT_MIN_BALANCE, this.broker));
    this.Conditions.push(new PercentagePositionSize(AppConfig.DEFAULT_PERCENTAGE_AT_RISK, this.broker));
    this.Conditions.push(new PositionRange(AppConfig.DEFAULT_RANGE, this.broker));
    this.Conditions.push(new OpenOrdersRange(AppConfig.DEFAULT_RANGE, this.broker));

    // ACTIONS
    this.Actions.push(new SellOrder(this.broker));
    this.Actions.push(new CancelMaxOrders(this.broker, "sell"));
  }
}
