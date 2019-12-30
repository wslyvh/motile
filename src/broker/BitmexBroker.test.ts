import * as dotenv from "dotenv";
import { BitmexBroker } from "./BitmexBroker";

dotenv.config();
const key = process.env.BOT_KEY_0 || "";
const secret = process.env.BOT_SECRET_0 || "";

describe("ExampleBroker", () => {
  test("Get Price", async () => {
    const broker = new BitmexBroker(key, secret);

    const response = await broker.price();

    expect(response).toBeDefined();
    expect(response).toBeGreaterThan(1);
  });

  test("Get Position", async () => {
    const broker = new BitmexBroker(key, secret);

    const response = await broker.position();

    expect(response).toBeDefined();
  });

  test("Get Balance", async () => {
    const broker = new BitmexBroker(key, secret);

    const response = await broker.balance();

    expect(response).toBeDefined();
    expect(response.BTC).toBeGreaterThan(0);
    expect(response.USD).toBeGreaterThan(0);
  });
});
