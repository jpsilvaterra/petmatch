import { z } from 'zod';

export const CreateAddressRequestSchema = z.object({
  street: z.string(),
  state: z.string(),
  zip: z.string(),
});

export const UpdateAddressRequestSchema = z.object({
  street: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
});
