import { SellOrder } from "../actions/SellOrder";
import { UpdatePositionClose } from "../actions/UpdatePositionClose";
import { BitmexBroker } from "../broker/BitmexBroker";
import { IBroker } from "../broker/IBroker";
import { PercentagePositionSize, PositionRange } from "../conditions";
import AppConfig from "../config/config";
import { Strategy } from "./Strategy";

export class Short extends Strategy {
  private broker: IBroker;

  public constructor(broker: IBroker = new BitmexBroker()) {
    super();

    this.broker = broker;

    this.Conditions.push(new PercentagePositionSize(AppConfig.DEFAULT_PERCENTAGE_AT_RISK, this.broker));
    this.Conditions.push(new PositionRange(AppConfig.DEFAULT_RANGE, this.broker));

    this.Actions.push(new SellOrder(this.broker));
    this.Actions.push(new UpdatePositionClose(this.broker));
  }
}
