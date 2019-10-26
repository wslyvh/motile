import { ExampleBroker } from "./ExampleBroker";

describe("ExampleBroker", () => {
  test("Get Price", async () => {
    const broker = new ExampleBroker();

    const response = await broker.price();

    expect(response).toBeDefined();
    expect(response).toBe(8500);
  });

  test("Get Position", async () => {
    const broker = new ExampleBroker();

    const response = await broker.position();

    expect(response).toBeNull();
  });

  test("Get Balance", async () => {
    const broker = new ExampleBroker();

    const response = await broker.balance();

    expect(response).toBeDefined();
    expect(response.BTC).toBe(0.2);
    expect(response.USD).toBe(1700);
  });
});
