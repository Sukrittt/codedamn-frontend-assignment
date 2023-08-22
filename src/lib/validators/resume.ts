import { z } from "zod";

export const resumeFormSchema = z.object({
  bio: z.string().max(50).optional().nullable(),
  location: z.string().max(50).optional().nullable(),
  lookingForJob: z.boolean(),
  techSkills: z.array(
    z.string().min(1, "Skill is required").max(100, "Skill is too long")
  ),
  interests: z.array(
    z.string().min(1, "Interest is required").max(100, "Interest is too long")
  ),
  languages: z.array(
    z.string().min(1, "Language is required").max(100, "Language is too long")
  ),
});

export type ResumeFormSchemaType = z.infer<typeof resumeFormSchema>;
