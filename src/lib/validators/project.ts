import { z } from "zod";

export const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(50, "Title is too long"),
  link: z.string().min(1, "Link is required").url(),
});

export type ProjectFormSchemaType = z.infer<typeof projectFormSchema>;

export const projectFormSchemaServer = projectFormSchema.extend({
  skills: z
    .array(z.string().min(1, "Skill is required").max(100, "Skill is too long"))
    .min(1, "Atleast 1 skill is required"),
  image: z.string().min(1, "Image is required").url().nullable(),
});

export type projectFormSchemaServerType = z.infer<
  typeof projectFormSchemaServer
>;
