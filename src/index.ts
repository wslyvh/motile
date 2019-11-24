import AppConfig = require("./config/config");
import { RunMultipleConfigs } from "./multi";

// tslint:disable-next-line: no-console
console.log("Running...", AppConfig.EXECUTE_MODE);
RunMultipleConfigs(2);
