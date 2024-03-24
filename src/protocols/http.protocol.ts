import { APIGatewayProxyEventV2 } from "aws-lambda";

export interface HttpResponse {
  statusCode: number
  body?: object
}

export interface HttpRequest extends Omit<APIGatewayProxyEventV2, 'body'> {
  body?: any
}
