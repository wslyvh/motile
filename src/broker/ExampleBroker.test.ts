import { ExampleBroker } from "./ExampleBroker";

describe("ExampleBroker", () => {
  test("Get Price", async () => {
    const broker = new ExampleBroker();

    const response = await broker.price();

    expect(response).toBeDefined();
    expect(response).toBe(8585);
  });

  test("Get Position", async () => {
    const broker = new ExampleBroker();

    const response = await broker.position();

    expect(response).toBeDefined();
    expect(response).toBe(800);
  });

  test("Get Balance", async () => {
    const broker = new ExampleBroker();

    const response = await broker.balance();

    expect(response).toBeDefined();
    expect(response).toBe(0.21);
  });
});
