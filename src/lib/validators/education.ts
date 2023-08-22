import { z } from "zod";

export const educationFormSchema = z.object({
  schoolName: z
    .string()
    .min(3, "School name must be at least 3 characters long")
    .max(150, "School name be less than 150 characters long"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters long")
    .optional()
    .nullable(),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters long")
    .max(100, "Location must be less than 100 characters long"),
  degree: z
    .string()
    .max(80, "Degree name must be less than 80 characters long")
    .optional()
    .nullable(),
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

export type EducationFormSchemaType = z.infer<typeof educationFormSchema>;

export const deleteEducationSchema = z.object({
  educationId: z.string(),
});

export type DeleteEducationSchemaType = z.infer<typeof deleteEducationSchema>;
