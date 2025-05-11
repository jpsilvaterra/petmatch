import { User } from '../../generated/prisma';

// Interface para filtros nas buscas (WHERE)
export interface IUserWhereParams {
  name?: {
    like?: string;
    equals?: string;
    mode?: 'default' | 'insensitive';
  };
  email?: {
    like?: string;
    equals?: string;
    mode?: 'default' | 'insensitive';
  };
  phone?: {
    like?: string;
    equals?: string;
  };
}

// Interface que representa os parâmetros de busca com paginação, ordenação e filtros
export interface IFindUserParams {
  where?: IUserWhereParams;
  sortBy?: 'name' | 'email' | 'phone' | 'createdAt';
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// Interface para criação de usuários
export interface ICreateUserAttributes {
  name: string;
  email: string;
  password: string;
  phone: string;
  profilePictureUrl?: string;
  description?: string;
}

export interface IGetUsersParams {
  name?: string;
  email?: string;
  phone?: string;
  page?: number;
  pageSize?: number;
  sortBy?: 'name' | 'email' | 'phone' | 'createdAt';
  order?: 'asc' | 'desc';
}

// Interface do repositório de usuários com todos os métodos
export interface IUsersRepository {
  find: (params: IFindUserParams) => Promise<User[]>;
  findById: (id: number) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  count: (where: IUserWhereParams) => Promise<number>;
  create: (attributes: ICreateUserAttributes) => Promise<User>;
  updateById: (
    id: number,
    attributes: Partial<ICreateUserAttributes>
  ) => Promise<User | null>;
  deleteById: (id: number) => Promise<User | null>;
}
