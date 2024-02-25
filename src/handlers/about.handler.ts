import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { AboutController } from '../controllers/about.controller'
import authorizationMiddleware from '../middlewares/authorization.middleware'

export const handler = middy<APIGatewayProxyEvent, APIGatewayProxyResult>()
  .use(jsonBodyParser())
  .user(httpEventNormalizer())
  .use(authorizationMiddleware())
  .handler(async (request: any, context: any) => {
    return await new AboutController().handle(request, context)
  })
