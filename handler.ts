import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { ScaledProtected } from "./src/strategy/ScaledProtected";

export const scaledProtected: APIGatewayProxyHandler = async (event, context) => {
  const strategy = new ScaledProtected();
  const succes = await strategy.Run();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: succes ? "Success" : "No"
      },
      null,
      2
    )
  };
};
