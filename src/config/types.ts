
export enum BotType { 
    SIMPLE = "SIMPLE",
    LONG = "LONG",
    SHORT = "SHORT",
}

export interface IBot { 
    key: string;
    secret: string;
    type: BotType,
    enabled: boolean;
    balanceSize: number; // % of total balance at risk 
    positionSize: number; // % of balance per order 
    minOrderSize: number; // 25; to avoid API spamming 
    spread: number; // % from current price 
    range: number; // % from current price
}