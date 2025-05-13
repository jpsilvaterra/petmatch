import { z } from 'zod';

// schema de status dos pets
export const PetStatusSchema = z.enum(['Unavailable', 'Available']);

// schema de busca de pets
export const GetPetsRequestSchema = z.object({
  name: z.string().optional(),
  breed: z.string().optional(),
  status: PetStatusSchema.optional(),
  page: z.string().optional(),
  pageSize: z.string().optional(),
  sortBy: z.enum(['name', 'breed', 'status']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

// schema de criação de pets
export const CreatePetRequestSchema = z.object({
  name: z.string(),
  breed: z.string(),
  birthDate: z.coerce.date(),
  description: z.string().optional(),
  photoUrl: z.string().optional(),
  status: PetStatusSchema.optional(),
});

// schema de atualização de pets
export const UpdatePetRequestSchema = z.object({
  name: z.string().optional(),
  breed: z.string().optional(),
  birthDate: z.coerce.date().optional(),
  description: z.string().optional(),
  photoUrl: z.string().optional(),
  status: PetStatusSchema.optional(),
});
