import { APIGatewayProxyEventV2WithJWTAuthorizer } from "aws-lambda"
import { GetBlogPostsController } from "./controllers"
import { HttpException } from "./protocols"


export const handler = async (event: APIGatewayProxyEventV2WithJWTAuthorizer) => {
  try {
    const route = event?.routeKey
    if (!route) throw new Error(`Missing route path`)

    let httpResponse

    switch(route) {
      case 'POST /posts': {
        httpResponse = await new GetBlogPostsController().perform(event)
        break
      }

      default: {
        throw new Error(`Unsupported route: "${route}"`)
      }
    }

    if (!httpResponse) throw new Error(`Missing response from route "${route}"`)

    console.log(httpResponse)

    return httpResponse
  } catch (error: unknown) {
    console.log(error)
    if (error instanceof HttpException) {
      return { statusCode: error.statusCode, body: { message: error?.message, statusCode: error.statusCode, internalCode: error.internalCode } }
    }

    if (error instanceof Error) {
      return { statusCode: 500, body: { message: 'Internal Server Error', statusCode: 500, internalCode: 'E500' } }
    }

    return { statusCode: 500, body: { message: 'Unhandled Exception', statusCode: 500, internalCode: 'E500' } }
  }
}
