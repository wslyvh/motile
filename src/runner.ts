import { GetSRSI } from "./analysis/technicalAnalyser";
import { BitmexBroker } from "./broker/BitmexBroker";
import botsConfig from "./config/botsConfig";
import { BotType, IBot } from "./config/types";
import { Long } from "./strategy/Long";
import { PositionUpdate } from "./strategy/PositionUpdate";
import { Short } from "./strategy/Short";
import { SingleOrder } from "./strategy/SingleOrder";
import logger from "./utils/Logger";

export class BotRunner {
  public Bots: IBot[] = [];

  public constructor(bots: IBot[] = botsConfig) {
    this.Bots = bots;
  }

  public async Run(): Promise<void> {
    // TA indicators
    const srsi = await GetSRSI();

    for (const bot of this.Bots) {
      if (!bot.key && !bot.secret) {
        logger.error("invalid key and/or secret. SKIP");
        continue;
      }
      if (!bot.enabled) {
        logger.error(bot.type + " not enabled. SKIP");
        continue;
      }
      logger.info("Running " + bot.type);
      try {
        await this.runBot(bot, srsi);
      } catch (ex) {
        logger.error("Error running bot..");
        logger.error(ex);
      }
    }
  }

  public async Status(): Promise<void> {
    for (const bot of this.Bots) {
      if (!bot.key && !bot.secret) {
        logger.error("invalid key and/or secret.");
        continue;
      }
      const broker = new BitmexBroker(bot.key, bot.secret);
      const price = await broker.price();
      const position = await broker.position();
      const balance = await broker.balance();
      const orders = await broker.getOpenOrders();

      console.log(bot.key);
      console.log("TYPE:", bot.type);
      console.log("ENABLED:", bot.enabled);
      console.log("PRICE:", price);
      console.log("POSITION:", position);
      console.log("BALANCE:", balance);
      console.log("ORDERS:", orders.length);
      console.log("-----");
    }
  }

  private async runBot(bot: IBot, srsi?: number) {
    const broker = new BitmexBroker(bot.key, bot.secret);

    switch (bot.type) {
      case BotType.SIMPLE: {
        await new SingleOrder(broker).Run();
        break;
      }
      case BotType.LONG: {
        await new PositionUpdate(broker).Run();

        if (srsi && srsi > 80) {
          logger.info("SRSI overbought. Skip LONG strategy.");
        } else {
          await new Long(broker).Run();
        }
        break;
      }
      case BotType.SHORT: {
        await new PositionUpdate(broker).Run();

        if (srsi && srsi < 20) {
          logger.info("SRSI overbought. Skip SHORT strategy.");
        } else {
          await new Short(broker).Run();
        }
        break;
      }
    }
  }
}

export async function RunBots() {
  const runner = new BotRunner();
  await runner.Run();
}

export async function StatusBots() {
  const runner = new BotRunner();
  await runner.Status();
}
