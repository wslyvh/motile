import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { RunBots, RunMultipleConfigs } from "./src/multi";

export const defaultFunction: APIGatewayProxyHandler = async (event, context) => {
  // const resultMulti = await RunMultipleConfigs(2);
  const resultBots = await RunBots();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Ok"
      },
      null,
      2
    )
  };
};
