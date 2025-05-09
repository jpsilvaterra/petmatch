import { prisma } from '../database';
import { HttpError } from '../errors/HttpError';

// validação de existência da entidade
export async function checkEntityExists(
  model: keyof typeof prisma,
  key: string,
  value: any,
  notFoundMessage: string
) {
  const entity = await prisma[model].findUnique({ where: { [key]: value } });

  if (!entity) throw new HttpError(404, notFoundMessage);

  return entity;
}
