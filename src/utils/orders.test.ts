import AppConfig = require("../config/config");
import { getOrderSize } from "./orders";

describe("Creating a Logger ", () => {
  it("should get order size", () => {
    const balance = 100;
    const orderSize = getOrderSize(balance);

    expect(orderSize).toBe(AppConfig.DEFAULT_MIN_ORDERSIZE);
  });

  it("should get min order size", () => {
    const balance = 10000;
    const orderSize = getOrderSize(balance);
    const expected = Math.round(balance * AppConfig.DEFAULT_RISK_LEVEL);

    expect(orderSize).toBe(expected);
  });
});
