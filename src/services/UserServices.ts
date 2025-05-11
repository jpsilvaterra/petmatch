import bcrypt from 'bcryptjs';
import { HttpError } from '../errors/HttpError';
import {
  IGetUsersParams,
  ICreateUserAttributes,
  IUsersRepository,
  IUserWhereParams,
} from '../repositories/UsersRepository';

export class UsersService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  // retorna todos os usuários
  async getAllUsers(params: IGetUsersParams) {
    const {
      name,
      email,
      phone,
      page = 1,
      pageSize = 10,
      sortBy,
      order,
    } = params;

    const limit = pageSize;
    const offset = (page - 1) * limit;

    const where: IUserWhereParams = {};

    if (name) where.name = { like: name, mode: 'insensitive' };
    if (email) where.email = { like: email, mode: 'insensitive' };
    if (phone) where.phone = { like: phone };

    const users = await this.usersRepository.find({
      where,
      sortBy,
      order,
      limit,
      offset,
    });

    const total = await this.usersRepository.count(where);

    return {
      data: users,
      meta: {
        page: +page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // cria um novo usuário
  async createUser(params: ICreateUserAttributes) {
    const existingUser = await this.usersRepository.findByEmail(params.email);
    if (existingUser) throw new HttpError(400, 'Email já cadastrado');

    const hashedPassword = await bcrypt.hash(params.password, 10);

    const newUser = await this.usersRepository.create({
      name: params.name,
      email: params.email,
      phone: params.phone,
      password: hashedPassword,
      description: params.description,
      profilePictureUrl: params.profilePictureUrl,
    });

    return newUser;
  }

  // busca um usuário pelo id
  async getUserById(id: number) {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new HttpError(404, 'usuário não encontrado');

    return user;
  }

  // atualiza um usuário
  async updateUser(userId: number, params: Partial<ICreateUserAttributes>) {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new HttpError(404, 'Usuário não encontrado');

    if (params.password) {
      params.password = await bcrypt.hash(params.password, 10);
    }

    const updatedUser = await this.usersRepository.updateById(userId, {
      name: params.name,
      email: params.email,
      phone: params.phone,
      password: params.password,
      description: params.description,
      profilePictureUrl: params.profilePictureUrl,
    });

    return updatedUser;
  }

  // deleta um usuário
  async deleteUser(userId: number) {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new HttpError(404, 'Usuário não encontrado');

    const deletedUser = await this.usersRepository.deleteById(userId);

    return deletedUser;
  }
}
