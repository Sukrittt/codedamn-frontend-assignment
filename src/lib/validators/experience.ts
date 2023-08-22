import { z } from "zod";

export const experienceFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(150, "Title must be less than 150 characters long"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters long")
    .optional()
    .nullable(),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters long")
    .max(100, "Location must be less than 100 characters long"),
  company: z
    .string()
    .min(3, "Company must be at least 3 characters long")
    .max(100, "Company must be less than 100 characters long"),
  startDate: z
    .date()
    .min(new Date(1900, 1, 1), "Start date must be after 1900")
    .max(new Date(), "Start date must be before today"),
  endDate: z
    .date()
    .min(new Date(1900, 1, 1), "End date must be after 1900")
    .max(new Date(), "End date must be before today")
    .nullable()
    .optional(),
});

export type ExperienceFormSchemaType = z.infer<typeof experienceFormSchema>;

export const deleteExperienceSchema = z.object({
  experienceId: z.string(),
});

export type DeleteExperienceSchemaType = z.infer<typeof deleteExperienceSchema>;
