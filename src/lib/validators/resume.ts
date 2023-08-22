import { z } from "zod";

export const resumeFormSchema = z.object({
  bio: z.string().max(80).optional().nullable(),
  location: z.string().max(50).optional().nullable(),
  lookingForJob: z.boolean(),
});

export type ResumeFormSchemaType = z.infer<typeof resumeFormSchema>;

export const resumeFormSchemaServer = resumeFormSchema.extend({
  techSkills: z.array(z.string()),
  interests: z.array(z.string()),
  languages: z.array(z.string()),
});

export type ResumeFormSchemaServerType = z.infer<typeof resumeFormSchemaServer>;
