import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { HttpRequest } from '../protocols';

export default function ParserHttpApiV2() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const controller_handler = descriptor.value;

    descriptor.value = function (...args: APIGatewayProxyEventV2[]) {
        const request = parseRequest(args[0])

        return controller_handler.apply(this, [request])
    }

    return descriptor
  }
}

function parseRequest (event: HttpRequest): HttpRequest {
  if (!event?.body) { event.body = {} } else { event.body = JSON.parse(event.body) }
  if (!event?.pathParameters) event.pathParameters = {}
  if (!event?.queryStringParameters) event.queryStringParameters = {}
  if (!event?.headers) event.headers = {}

  console.log(`PARSER: ${JSON.stringify(event)}`)
  return event
}
