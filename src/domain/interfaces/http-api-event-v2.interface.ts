import { APIGatewayProxyEventV2 } from "aws-lambda";

export interface HttpRequest extends Omit<APIGatewayProxyEventV2, 'body'> {
  body?: any
}
