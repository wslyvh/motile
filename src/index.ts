import AppConfig = require("./config/config");
import { RunBots } from "./runner";

// tslint:disable-next-line: no-console
console.log("Running...", AppConfig.EXECUTE_MODE);
RunBots();
