import { BuyOrder } from "../actions/BuyOrder";
import { UpdatePositionClose } from "../actions/UpdatePositionClose";
import { IBroker } from "../broker/IBroker";
import { OpenOrdersRange, PercentagePositionSize, PositionRange } from "../conditions";
import AppConfig from "../config/config";
import { Strategy } from "./Strategy";

export class Long extends Strategy {
  private broker: IBroker;

  public constructor(broker: IBroker) {
    super();

    this.broker = broker;

    this.Conditions.push(new PercentagePositionSize(AppConfig.DEFAULT_PERCENTAGE_AT_RISK, this.broker));
    this.Conditions.push(new PositionRange(AppConfig.DEFAULT_RANGE, this.broker));
    this.Conditions.push(new OpenOrdersRange(AppConfig.DEFAULT_RANGE, this.broker));

    this.Actions.push(new UpdatePositionClose(this.broker));
    this.Actions.push(new BuyOrder(this.broker));
  }
}
