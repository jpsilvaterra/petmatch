import { z } from 'zod';

// schema de busca de usuário
export const GetUsersRequestSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  page: z.string().optional(),
  pageSize: z.string().optional(),
  sortBy: z.enum(['name', 'email', 'phone']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

// schema de criação de usuário
export const CreateUserRequestSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  profilePictureUrl: z.string().optional(),
  description: z.string().optional(),
});

// schema de atualização de usuário
export const UpdateUserRequestSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  phone: z.string().optional(),
  profilePictureUrl: z.string().optional(),
  description: z.string().optional(),
});
