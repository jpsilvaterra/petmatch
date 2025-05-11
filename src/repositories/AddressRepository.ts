import { Address } from '../../generated/prisma';

// Interface para filtros nas buscas (WHERE)
export interface IAddressWhereParams {
  street?: {
    like?: string;
    equals?: string;
    mode?: 'default' | 'insensitive';
  };
  state?: {
    like?: string;
    equals?: string;
    mode?: 'default' | 'insensitive';
  };
  zip?: {
    like?: string;
    equals?: string;
  };
}

// Interface que representa os parâmetros de busca com paginação, ordenação e filtros
export interface IFindAddressParams {
  where?: IAddressWhereParams;
  sortBy?: 'street' | 'state' | 'zip' | 'createdAt';
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// Interface para criação de endereço
export interface ICreateAddressAttributes {
  street: string;
  state: string;
  zip: string;
}

export interface IGetAddressParams {
  street?: string;
  state?: string;
  zip?: string;
  page?: number;
  pageSize?: number;
  sortBy?: 'street' | 'state' | 'zip' | 'createdAt';
  order?: 'asc' | 'desc';
}

// Interface do repositório de endereço com todos os métodos
export interface IAddressRepository {
  find: (params: IFindAddressParams) => Promise<Address[]>;
  findById: (id: number) => Promise<Address | null>;
  count: (where: IAddressWhereParams) => Promise<number>;
  create: (attributes: ICreateAddressAttributes) => Promise<Address>;
  updateById: (
    id: number,
    attributes: Partial<ICreateAddressAttributes>
  ) => Promise<Address | null>;
  deleteById: (id: number) => Promise<Address | null>;
}
