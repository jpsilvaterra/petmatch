import { User } from '../../../generated/prisma';
import { prisma } from '../../database';
import {
  ICreateUserAttributes,
  IFindUserParams,
  IUsersRepository,
  IUserWhereParams,
} from '../UsersRepository';

export class PrismaUsersRepository implements IUsersRepository {
  // Método para buscar múltiplos usuários com filtros, ordenação e paginação
  async find(params: IFindUserParams): Promise<User[]> {
    return prisma.user.findMany({
      where: {
        name: {
          contains: params.where?.name?.like,
          equals: params.where?.name?.equals,
          mode: params.where?.name?.mode,
        },
        email: {
          contains: params.where?.email?.like,
          equals: params.where?.email?.equals,
          mode: params.where?.email?.mode,
        },
        phone: {
          contains: params.where?.phone?.like,
          equals: params.where?.phone?.equals,
        },
      },
      orderBy: { [params.sortBy ?? 'name']: params.order },
      skip: params.offset,
      take: params.limit,
    });
  }

  // Busca um único usuário pelo ID, incluindo pets e endereço
  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id: id },
      include: {
        pets: true,
        address: true,
      },
    });
  }

  // Busca um usuário pelo e-mail
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email: email },
    });
  }

  // Conta o número total de usuários com base nos filtros
  async count(where: IUserWhereParams): Promise<number> {
    return prisma.user.count({
      where: {
        name: {
          contains: where?.name?.like,
          equals: where?.name?.equals,
          mode: where?.name?.mode,
        },
        email: {
          contains: where?.email?.like,
          equals: where?.email?.equals,
          mode: where?.email?.mode,
        },
        phone: {
          contains: where?.phone?.like,
          equals: where?.phone?.equals,
        },
      },
    });
  }

  // Criação de um novo usuário
  async create(attributes: ICreateUserAttributes): Promise<User> {
    return prisma.user.create({ data: attributes });
  }

  // Atualiza um usuário
  async updateById(
    id: number,
    attributes: Partial<ICreateUserAttributes>
  ): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: attributes,
    });
  }

  // Exclui um usuário
  async deleteById(id: number): Promise<User> {
    return prisma.user.delete({ where: { id } });
  }
}
