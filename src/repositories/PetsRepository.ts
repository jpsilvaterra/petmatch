import { Pets } from '../../generated/prisma';

export type PetStatus = 'Available' | 'Unavailable';

// Interface para filtros nas buscas (WHERE)
export interface IPetWhereParams {
  name?: {
    like?: string;
    equals?: string;
    mode?: 'default' | 'insensitive';
  };
  breed?: {
    like?: string;
    equals?: string;
    mode?: 'default' | 'insensitive';
  };
  status?: PetStatus;
}

// Interface que representa os parâmetros de busca com paginação, ordenação e filtros
export interface IFindPetParams {
  where?: IPetWhereParams;
  sortBy?: 'name' | 'breed' | 'status' | 'createdAt';
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// Interface para criação de pets
export interface ICreatePetAttributes {
  name: string;
  breed: string;
  birthDate: Date;
  status: PetStatus;
  photoUrl?: string;
  description?: string;
}

// Interface para os parâmetros de busca, paginação e ordenação na listagem de pets
export interface IGetPetsParams {
  name?: string;
  breed?: string;
  status?: PetStatus;
  page?: number;
  pageSize?: number;
  sortBy?: 'name' | 'breed' | 'status' | 'createdAt';
  order?: 'asc' | 'desc';
}

// Interface do repositório de pets com todos os métodos
export interface IPetsRepository {
  find: (params: IFindPetParams) => Promise<Pets[]>;
  findById: (id: number) => Promise<Pets | null>;
  count: (where: IPetWhereParams) => Promise<number>;
  create: (attributes: ICreatePetAttributes) => Promise<Pets>;
  updateById: (
    id: number,
    attributes: Partial<ICreatePetAttributes>
  ) => Promise<Pets | null>;
  deleteById: (id: number) => Promise<Pets | null>;
}
