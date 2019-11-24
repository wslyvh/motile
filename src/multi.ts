import { BitmexBroker } from "./broker/BitmexBroker";
import { Long } from "./strategy/Long";
import { SingleOrder } from "./strategy/SingleOrder";
import logger = require("./utils/Logger");

export async function RunMultipleConfigs(configs: number = 2) {
  for (let i = 0; i < configs; i++) {
    const key = process.env["BITMEX_KEY_" + i];
    const secret = process.env["BITMEX_SECRET_" + i];

    if (!key || !secret) {
      // tslint:disable-next-line: no-console
      console.log("Keys not found.");
      continue;
    }

    logger.info("BitmexBroker: " + i);
    const broker = new BitmexBroker(key, secret);

    if (i === 0) {
      const single = new SingleOrder(broker);
      await single.Run();
      continue;
    }

    const long = new Long(broker);
    await long.Run();
  }
}
