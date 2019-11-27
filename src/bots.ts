import { BitmexBroker } from "./broker/BitmexBroker";
import botsConfig from "./config/botsConfig";
import { BotType, IBot } from "./config/types";
import { Long } from "./strategy/Long";
import { Short } from "./strategy/Short";
import { SingleOrder } from "./strategy/SingleOrder";
import logger from "./utils/Logger";

export class BotRunner { 
  public Bots: IBot[] = [];

  public constructor(bots: IBot[] = botsConfig) {
    this.Bots = bots;
  }
  
  public Run(): void { 

    this.Bots.forEach(async bot => {
        if (!bot.key && !bot.secret) { 
          logger.info("invalid key and/or secret. SKIP");
          return;
        }

        if (!bot.enabled) { 
            logger.info(bot.type + " not enabled. SKIP");
            return;
        }
    
        logger.info("Running " + bot.type);
        try {
            this.runBot(bot);
        }
        catch(ex) {
            logger.error("Error running bot");
            logger.error(ex);            
        }
    });
  }

  private async runBot(bot: IBot) { 
    const broker = new BitmexBroker(bot.key, bot.secret);

    switch(bot.type) { 
        case BotType.SIMPLE: { 
            await new SingleOrder(broker).Run();
            break;
        }
        case BotType.LONG: { 
            await new Long(broker).Run();
            break;
        }
        case BotType.SHORT: { 
            await new Short(broker).Run();
            break;
        }
    }
  }
}
