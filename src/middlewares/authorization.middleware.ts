import middy from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const authorizationMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request): Promise<APIGatewayProxyResult> => {
    const { event, context } = request
    if (!event.headers?.authorization) throw new HttpException(HTTP_ERRO.Unauthorized, '')

    const access_token = event.headers?.authorization

    return {}
  }

  return { before }
}

export default authorizationMiddleware
