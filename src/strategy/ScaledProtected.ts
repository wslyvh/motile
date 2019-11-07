import { BitmexBroker } from "../broker/BitmexBroker";
import logger from "../utils/Logger";
import { ScaledOrders } from "./ScaledOrders";

export class ScaledProtected extends ScaledOrders {
  public async Run(): Promise<void> {
    const broker = new BitmexBroker();
    if (await broker.hasOpenOrders()) {
      logger.warn("There are still open orders. Not creating new ones.");
      return;
    }

    super.Run();
  }
}
