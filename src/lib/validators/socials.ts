import { z } from "zod";

export const socialsFormSchema = z.object({
  githubUrl: z.string().optional().nullable(),
  linkedInUrl: z.string().optional().nullable(),
  facebookUrl: z.string().optional().nullable(),
  instagramUrl: z.string().optional().nullable(),
  dribbbleUrl: z.string().optional().nullable(),
  behanceUrl: z.string().optional().nullable(),
});

export type SocialsFormSchemaType = z.infer<typeof socialsFormSchema>;
