import { z } from 'zod';

// schema de busca de endereço
export const GetAddressRequestSchema = z.object({
  street: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  page: z.string().optional(),
  pageSize: z.string().optional(),
  sortBy: z.enum(['street', 'state', 'zip']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

// schema de criação de endereço
export const CreateAddressRequestSchema = z.object({
  street: z.string(),
  state: z.string(),
  zip: z.string(),
});

// schema de atualização de endereço
export const UpdateAddressRequestSchema = z.object({
  street: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
});
