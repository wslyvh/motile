import { Sample } from "./strategy/Sample";
import { ScaledOrders } from "./strategy/ScaledOrders";

const sample = new Sample();
sample.Run();

const scaled = new ScaledOrders();
scaled.Run();
