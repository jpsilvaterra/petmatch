import { z } from 'zod';

// Schema de criação de usuário
export const CreateUserRequestSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  profilePictureUrl: z.string().optional(),
  description: z.string().optional(),
});

// Schema de atualização de usuário
export const UpdateUserRequestSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  phone: z.string().optional(),
  profilePictureUrl: z.string().optional(),
  description: z.string().optional(),
});
