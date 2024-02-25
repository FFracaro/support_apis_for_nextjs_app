export class AboutController {
  async handle (request: any, context: any): Promise<any> {
    // data
    const about_service = new AboutService()
    const result = await about_service.execute()

    return { statusCode: 200, body: result }
  }
}
