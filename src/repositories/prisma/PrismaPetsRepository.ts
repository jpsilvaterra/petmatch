import { Pets } from '../../../generated/prisma';
import { prisma } from '../../database';
import {
  ICreatePetAttributes,
  IFindPetParams,
  IPetsRepository,
  IPetWhereParams,
} from '../PetsRepository';

export class PrismaPetsRepository implements IPetsRepository {
  // Método para buscar múltiplos pets com filtros, ordenação e paginação
  async find(params: IFindPetParams): Promise<Pets[]> {
    return prisma.pets.findMany({
      where: {
        name: {
          contains: params.where?.name?.like,
          equals: params.where?.name?.equals,
          mode: params.where?.name?.mode,
        },
        breed: {
          contains: params.where?.breed?.like,
          equals: params.where?.breed?.equals,
          mode: params.where?.breed?.mode,
        },
        status: params.where?.status,
      },
      orderBy: { [params.sortBy ?? 'name']: params.order },
      skip: params.offset,
      take: params.limit,
    });
  }

  // Busca um único pet pelo ID, incluindo o dono
  async findById(id: number): Promise<Pets | null> {
    return await prisma.pets.findUnique({
      where: { id: id },
      include: {
        owner: true,
      },
    });
  }

  // Conta o número total de pets com base nos filtros
  async count(where: IPetWhereParams): Promise<number> {
    return prisma.pets.count({
      where: {
        name: {
          contains: where?.name?.like,
          equals: where?.name?.equals,
          mode: where?.name?.mode,
        },
        breed: {
          contains: where?.breed?.like,
          equals: where?.breed?.equals,
          mode: where?.breed?.mode,
        },
        status: where?.status,
      },
    });
  }

  // Criação de um novo pet
  async create(attributes: ICreatePetAttributes): Promise<Pets> {
    return await prisma.pets.create({
      data: attributes,
    });
  }

  // Atualiza um pet
  async updateById(
    id: number,
    attributes: Partial<ICreatePetAttributes>
  ): Promise<Pets> {
    return await prisma.pets.update({
      where: { id: +id },
      data: attributes,
    });
  }

  // Exclui um pet
  async deleteById(id: number): Promise<Pets> {
    return await prisma.pets.delete({
      where: { id: +id },
    });
  }
}
