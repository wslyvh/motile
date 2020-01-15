import * as dotenv from "dotenv";
import { DEFAULTS } from "../constants";
import { BotType, IBot } from "./types";

dotenv.config();

const botsConfig: IBot[] = [getConfig(0), getConfig(1), getConfig(2), getConfig(3), getConfig(4)];

function getConfig(index: number): IBot {
  return {
    key: process.env["BOT_KEY_" + index] || "",
    secret: process.env["BOT_SECRET_" + index] || "",
    type: parseBotType("BOT_TYPE_" + index),
    enabled: parseBool("BOT_ENABLED_" + index),
    balanceSize: parseNumber("BOT_BALANCE_SIZE_" + index, DEFAULTS.BOT_BALANCE_SIZE),
    positionSize: parseNumber("BOT_POSITION_SIZE_" + index, DEFAULTS.BOT_POSITION_SIZE),
    minOrderSize: parseNumber("BOT_MIN_ORDER_SIZE_" + index, DEFAULTS.BOT_MIN_ORDER_SIZE),
    spread: parseNumber("BOT_SPREAD_" + index, DEFAULTS.BOT_SPREAD),
    range: parseNumber("BOT_RANGE_" + index, DEFAULTS.BOT_RANGE)
  };
}

function parseBotType(key: string): BotType {
  return (process.env[key] as BotType) || DEFAULTS.BOT_TYPE;
}

function parseBool(key: string): boolean {
  return process.env[key] && process.env[key] === "false" ? false : DEFAULTS.BOT_ENABLED;
}

function parseNumber(key: string, defaultValue: number): number {
  return process.env[key] ? Number(process.env[key]) : defaultValue;
}

export = botsConfig;
