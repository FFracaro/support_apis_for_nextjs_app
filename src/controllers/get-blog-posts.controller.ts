import ParserHttpApiV2 from "../decorators/parse-http-api-v2.decorator";
import Validation from "../decorators/validation.decorator";
import { blogPostsSchema } from "../validation/schemas/blog-posts.schema";
import { HTTP_CODE, HttpRequest, HttpResponse } from "../protocols";
import { BlogPostsService } from "../services";

export class GetBlogPostsController {
  @ParserHttpApiV2()
  @Validation(blogPostsSchema)
  async perform (httpRequest: HttpRequest): Promise<HttpResponse> {
    console.log(JSON.stringify(httpRequest))

    const result = await new BlogPostsService().execute({
      type: httpRequest.body.type,
      origin: httpRequest.body.origin
    })

    return { statusCode: HTTP_CODE.Success, body: result }
  }
}
