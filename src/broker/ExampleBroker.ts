import { IBroker } from "./IBroker";

export class ExampleBroker implements IBroker {
  public price(ticker?: string): number {
    if (ticker === "ETH") {
      return 180;
    }

    return 8585;
  }
  public position(): number {
    return 800;
  }
  public balance(): number {
    return 0.21;
  }
}
