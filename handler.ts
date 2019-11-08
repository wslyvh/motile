import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { SingleOrder } from "./src/strategy/SingleOrder";

export const defaultFunction: APIGatewayProxyHandler = async (event, context) => {
  const strategy = new SingleOrder();
  const success = await strategy.Run();

  return {
    statusCode: success ? 200 : 204,
    body: JSON.stringify(
      {
        message: success ? "Success" : "No trades created."
      },
      null,
      2
    )
  };
};
