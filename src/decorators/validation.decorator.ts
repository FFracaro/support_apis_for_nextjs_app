import { ZodSchema } from "zod";
import { HTTP_CODE, HttpException, HttpRequest } from "../protocols";

export default function Validation(schema: ZodSchema) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const controller_handler = descriptor.value;

    descriptor.value = function (...args: HttpRequest[]) {
        // Process data here
        const validated_data = validateData(args[0], schema);

        // Call the original method with processed data
        return controller_handler.apply(this, [validated_data]);
    }

    return descriptor
  }
}

function validateData(event: HttpRequest, schema: ZodSchema): HttpRequest {
  const result = schema.safeParse(event)
  if (!result.success) {
    const error = Object.values(result.error.flatten().fieldErrors)
    throw new HttpException(HTTP_CODE.UnprocessableEntity, new Error(error[0]?.flat()[0]).message, 'E422')
  }

  return event
}
