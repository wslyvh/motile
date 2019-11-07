import { Sample } from "./strategy/Sample";
import { ScaledOrders } from "./strategy/ScaledOrders";
import { ScaledProtected } from "./strategy/ScaledProtected";

// const sample = new Sample();
// sample.Run();

// const scaled = new ScaledOrders();
// scaled.Run();

const scaledProtected = new ScaledProtected();
scaledProtected.Run();
