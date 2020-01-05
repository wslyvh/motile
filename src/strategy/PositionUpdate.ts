import { UpdatePositionClose } from "../actions/UpdatePositionClose";
import { IBroker } from "../broker/IBroker";
import { Strategy } from "./Strategy";

export class PositionUpdate extends Strategy {
  private broker: IBroker;

  public constructor(broker: IBroker) {
    super();

    this.broker = broker;

    // CONDITIONS

    // ACTIONS
    this.Actions.push(new UpdatePositionClose(this.broker));
  }
}
