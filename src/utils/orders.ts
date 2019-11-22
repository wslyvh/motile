import AppConfig from "../config/config";

export function getOrderSize(balance: number) {
  let orderSize = Math.round(balance * AppConfig.DEFAULT_RISK_LEVEL);
  if (orderSize < AppConfig.DEFAULT_MIN_ORDERSIZE) {
    orderSize = AppConfig.DEFAULT_MIN_ORDERSIZE;
  }

  return orderSize;
}
