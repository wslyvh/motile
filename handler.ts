import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { RunBots } from "./src/runner";

export const defaultFunction: APIGatewayProxyHandler = async (event, context) => {
  await RunBots();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Ok. Current time is ${new Date().toTimeString()}.`
    })
  };
};
