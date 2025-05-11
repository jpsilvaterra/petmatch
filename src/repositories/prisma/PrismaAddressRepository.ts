import { Address } from '../../../generated/prisma';
import { prisma } from '../../database';
import {
  IAddressRepository,
  IAddressWhereParams,
  ICreateAddressAttributes,
  IFindAddressParams,
} from '../AddressRepository';

export class PrismaAddressRepository implements IAddressRepository {
  // Método para buscar múltiplos endereços com filtros, ordenação e paginação
  async find(params: IFindAddressParams): Promise<Address[]> {
    return prisma.address.findMany({
      where: {
        street: {
          contains: params.where?.street?.like,
          equals: params.where?.street?.equals,
          mode: params.where?.street?.mode,
        },
        state: {
          contains: params.where?.state?.like,
          equals: params.where?.state?.equals,
          mode: params.where?.state?.mode,
        },
        zip: {
          contains: params.where?.zip?.like,
          equals: params.where?.zip?.equals,
        },
      },
      orderBy: { [params.sortBy ?? 'street']: params.order },
      skip: params.offset,
      take: params.limit,
    });
  }

  // Busca um único endereço pelo ID, incluindo o dono(s)
  async findById(id: number): Promise<Address | null> {
    return prisma.address.findUnique({
      where: { id: +id },
      include: {
        owners: true,
      },
    });
  }

  // Conta o número total de endereços com base nos filtros
  async count(where: IAddressWhereParams): Promise<number> {
    return prisma.address.count({
      where: {
        street: {
          contains: where?.street?.like,
          equals: where?.street?.equals,
          mode: where?.street?.mode,
        },
        state: {
          contains: where?.state?.like,
          equals: where?.state?.equals,
          mode: where?.state?.mode,
        },
        zip: {
          contains: where?.zip?.like,
          equals: where?.zip?.equals,
        },
      },
    });
  }

  // Criação de um novo endereço
  async create(attributes: ICreateAddressAttributes): Promise<Address> {
    return await prisma.address.create({
      data: attributes,
    });
  }

  // Atualiza um endereço
  async updateById(
    id: number,
    attributes: Partial<ICreateAddressAttributes>
  ): Promise<Address> {
    return prisma.address.update({
      where: { id: id },
      data: attributes,
    });
  }

  // Exclui um endereço
  async deleteById(id: number): Promise<Address> {
    return await prisma.address.delete({
      where: { id: id },
    });
  }
}
