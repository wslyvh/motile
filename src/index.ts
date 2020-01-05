import AppConfig = require("./config/config");
import { RunBots, StatusBots } from "./runner";

// tslint:disable-next-line: no-console
console.log("Running...", AppConfig.EXECUTE_MODE);
RunBots();
// StatusBots();
