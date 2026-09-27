import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  interest: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  consent: z.boolean(),
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
});

export type ValuationFormData = z.infer<typeof valuationRequestSchema>;
