import { IBroker, IPosition } from "../broker/IBroker";
import AppConfig from "../config/config";
import logger from "../utils/Logger";
import { IAction } from "./IAction";

export class UpdatePositionClose implements IAction {
  private broker: IBroker;

  public constructor(broker: IBroker) {
    this.broker = broker;
  }

  public async Execute(): Promise<boolean> {
    logger.info("Execute UpdatePositionClose..");

    const position = await this.broker.position();
    if (!position) {
      return false;
    }

    let price = Math.abs(position.Entry);
    const orderSize = Math.abs(position.Size);
    const spread = position.Entry * AppConfig.DEFAULT_SPREAD;
    const currentPrice = await this.broker.price();

    if (position.Size < 0) {
      const result = await this.cancelClosingOrder("sell", position);
      if (result) {
        logger.info("Update Position close: " + orderSize + ". SELL @ " + (price + spread));
        if (currentPrice > price + spread) {
          price = currentPrice;
        }
        await this.broker.createSellOrder(orderSize, price + spread);
      } else {
        logger.info("Order.Quantity and Position.Size are equal. Stop execution");
        return false;
      }
    }

    if (position.Size > 0) {
      const result = await this.cancelClosingOrder("buy", position);
      if (result) {
        logger.info("Update Position close: " + orderSize + ". BUY @ " + (price - spread));
        if (currentPrice < price - spread) {
          price = currentPrice;
        }
        await this.broker.createBuyOrder(orderSize, price - spread);
      } else {
        logger.info("Order.Quantity and Position.Size are equal. Stop execution");
        return false;
      }
    }

    return true;
  }

  private async cancelClosingOrder(side: "sell" | "buy", position: IPosition) {
    const orders = await this.broker.getOpenOrders(side);
    if (orders.length === 0) {
      return true;
    }

    if (orders && orders.length > 0) {
      const closeOrder = orders[0];
      if (closeOrder.Quantity === position.Size || -closeOrder.Quantity === position.Size) {
        // no need to update
        return false;
      }

      logger.info("Cancelling existing closing " + side + " order");
      await this.broker.cancelOrder(closeOrder.Id);
      return true;
    }

    return false;
  }
}
