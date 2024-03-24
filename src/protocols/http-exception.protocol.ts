import { HTTP_CODE } from "./http-code.protocol";

export class HttpException {
  constructor(
    public statusCode: HTTP_CODE,
    public message: string,
    public internalCode: string
   ) {}
}
