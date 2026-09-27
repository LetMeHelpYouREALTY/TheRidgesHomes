import { z } from 'zod';

const honeypotFields = {
  company: z.string().optional(),
  website: z.string().optional(),
};

export const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  interest: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  consent: z.boolean(),
  sourceUrl: z.string().url().optional(),
  ...honeypotFields,
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const valuationRequestSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(1),
  propertyType: z.string().optional().nullable(),
  estimatedValue: z.number().optional().nullable(),
  timeframe: z.string().optional().nullable(),
  sourceUrl: z.string().url().optional(),
  ...honeypotFields,
});

export type ValuationFormData = z.infer<typeof valuationRequestSchema>;
