import { z } from "zod";

export const certificateFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  credentialLink: z.string().min(1, "Credential link is required").url(),
  issuedOn: z.date().min(new Date(1900, 1, 1), "Invalid date"),
});

export type CertificateFormSchemaType = z.infer<typeof certificateFormSchema>;

export const deleteCertificateSchema = z.object({
  certificateId: z.string(),
});

export type DeleteCertificateSchemaType = z.infer<
  typeof deleteCertificateSchema
>;
