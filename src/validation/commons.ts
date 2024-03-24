import { z } from "zod";

export function nonEmptyString (field: string, minSize: number, maxSize: number) {
  return z.string({ invalid_type_error: `Invalid param: ${field} nedds to be a string data type`, required_error: `Missing param: ${field}` })
  .min(minSize, `Invalid param: ${field} cannot have less than ${minSize} characters`)
  .max(maxSize, `Invalid param: ${field} cannot have more than ${maxSize} characters`)
  .superRefine((data, ctx) => {
    if (isEmptyString(data)) { zodCustomError(field, `Invalid param: ${field} cannot be empty`, ctx) }
  })
}

export function isEmptyString(data: string) {
  return data.trim().length === 0
}

export function zodCustomError (field: string, message: string, ctx: z.RefinementCtx) {
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    path: [field],
    message: message
  })
}
