import AppConfig = require("./config/config");
import { RunBots, RunMultipleConfigs } from "./multi";

// tslint:disable-next-line: no-console
console.log("Running...", AppConfig.EXECUTE_MODE);
RunBots();
// RunMultipleConfigs(2);
