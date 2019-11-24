import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { RunMultipleConfigs } from "./src/multi";

export const defaultFunction: APIGatewayProxyHandler = async (event, context) => {
  const r = await RunMultipleConfigs(2);

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
