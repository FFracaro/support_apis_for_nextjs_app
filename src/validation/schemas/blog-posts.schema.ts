import { z } from "zod";
import { nonEmptyString } from "../commons";

const body = z.object({
  type: nonEmptyString('type', 1, 10),
  origin: nonEmptyString('origin', 5, 15)
})

export const blogPostsSchema = z.object({ body })
