import { BitmexBroker } from "./BitmexBroker";

describe("ExampleBroker", () => {
  test("Get Price", async () => {
    const broker = new BitmexBroker();

    const response = await broker.price();

    expect(response).toBeDefined();
    expect(response).toBeGreaterThan(1);
  });

  test("Get Position", async () => {
    const broker = new BitmexBroker();

    const response = await broker.position();

    expect(response).toBeDefined();
  });

  test("Get Balance", async () => {
    const broker = new BitmexBroker();

    const response = await broker.balance();

    expect(response).toBeDefined();
    expect(response.BTC).toBeGreaterThan(0);
    expect(response.USD).toBeGreaterThan(0);
  });
});
