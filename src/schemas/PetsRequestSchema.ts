import { z } from 'zod';

const PetStatusSchema = z.enum(['Unavailable', 'Available']);

export const CreatePetRequestSchema = z.object({
  name: z.string(),
  breed: z.string(),
  birthDate: z.coerce.date(),
  description: z.string().optional(),
  photoUrl: z.string().optional(),
  status: PetStatusSchema.optional(),
});

export const UpdatePetRequestSchema = z.object({
  name: z.string().optional(),
  breed: z.string().optional(),
  birthDate: z.coerce.date().optional(),
  description: z.string().optional(),
  photoUrl: z.string().optional(),
  status: PetStatusSchema.optional(),
});
