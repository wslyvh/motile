import AppConfig = require("./config/config");
import { StatusBots } from "./runner";

// tslint:disable-next-line: no-console
console.log("Running...", AppConfig.EXECUTE_MODE);

StatusBots();
