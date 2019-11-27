import * as dotenv from "dotenv";
import { BotType, IBot } from "./types";

dotenv.config();

const DEFAULT_BOT_TYPE = BotType.LONG;
const DEFAULT_BOT_ENABLED = true;
const DEFAULT_BOT_BALANCE_SIZE = 25;
const DEFAULT_BOT_POSITION_SIZE = 0.015;
const DEFAULT_BOT_MIN_ORDER_SIZE = 25;
const DEFAULT_BOT_SPREAD = 0.001;
const DEFAULT_BOT_RANGE = 0.0025;

const botsConfig: IBot[] = [
    getConfig(0),
    getConfig(1)
]

function getConfig(index: number) : IBot { 
    return {
        key: process.env["BOT_KEY_" + index] || "",
        secret: process.env["BOT_SECRET_" + index] || "",
        type: parseBotType("BOT_TYPE_" + index),
        enabled: parseBool("BOT_ENABLED_" + index),
        balanceSize: parseNumber("BOT_BALANCE_SIZE_" + index, DEFAULT_BOT_BALANCE_SIZE),
        positionSize: parseNumber("BOT_POSITION_SIZE_" + index, DEFAULT_BOT_POSITION_SIZE),
        minOrderSize: parseNumber("BOT_MIN_ORDER_SIZE_" + index, DEFAULT_BOT_MIN_ORDER_SIZE),
        spread: parseNumber("BOT_SPREAD_" + index, DEFAULT_BOT_SPREAD),
        range: parseNumber("BOT_RANGE_" + index, DEFAULT_BOT_RANGE)
    }
}

function parseBotType(key: string): BotType { 
    return process.env[key] as BotType || DEFAULT_BOT_TYPE;
}

function parseBool(key: string): boolean {
    return process.env[key] && process.env[key] === "false" ? false : DEFAULT_BOT_ENABLED;
}

function parseNumber(key: string, defaultValue: number): number { 
    return process.env[key] ? Number(process.env[key]) : defaultValue;
}

export = botsConfig;