import { z } from "zod";

export const GenderType = z
  .union([z.literal("male"), z.literal("female")])
  .nullable();

export const personalDetailsFormSchema = z.object({
  name: z
    .string()
    .min(2, "First name must be at least 2 characters long.")
    .max(50, "First name must be at most 50 characters long."),
  about: z
    .string()
    .min(2, "About must be at least 2 characters long.")
    .max(500, "About must be at most 500 characters long."),
  gender: GenderType,
  profession: z
    .string()
    .min(2, "Profession must be at least 2 characters long.")
    .max(50, "Profession must be at most 50 characters long."),
  showFollowersAndFollowing: z.boolean(),
  showXP: z.boolean(),
  showAchievementBadges: z.boolean(),
});

export type PersonalDetailsFormSchemaType = z.infer<
  typeof personalDetailsFormSchema
>;

export const personalDetailsServerFormSchema = personalDetailsFormSchema.extend(
  {
    image: z.string().nullable(),
    dateOfBirth: z.date().optional(),
  }
);

export type personalDetailsServerFormSchemaType = z.infer<
  typeof personalDetailsServerFormSchema
>;
