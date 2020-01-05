import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { RunBots, RunMultipleConfigs } from "./src/multi";

export const defaultFunction: APIGatewayProxyHandler = async (event, context) => {
  // await RunMultipleConfigs(2);
  await RunBots();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Ok. Current time is ${new Date().toTimeString()}.`
    })
  };
};
