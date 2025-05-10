import { Handler } from 'express';
import bcrypt from 'bcryptjs';
import {
  CreateUserRequestSchema,
  GetUsersRequestSchema,
  UpdateUserRequestSchema,
} from '../schemas/UsersRequestSchema';
import { HttpError } from '../errors/HttpError';
import {
  IUsersRepository,
  IUserWhereParams,
} from '../repositories/UsersRepository';

export class UsersController {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  // GET /users
  index: Handler = async (req, res, next) => {
    try {
      const {
        name,
        email,
        phone,
        page = '1',
        pageSize = '10',
        sortBy = 'name',
        order = 'asc',
      } = GetUsersRequestSchema.parse(req.query);

      const limit = +pageSize;
      const offset = (+page - 1) * limit;

      const where: IUserWhereParams = {};

      if (name) where.name = { like: name, mode: 'insensitive' };
      if (email) where.email = { like: email, mode: 'insensitive' };
      if (phone) where.phone = { like: phone };

      const users = await this.usersRepository.find({
        where,
        sortBy,
        order,
        limit: limit,
        offset: offset,
      });

      const total = await this.usersRepository.count(where);

      res.json({
        data: users,
        meta: {
          page: +page,
          pageSize: limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  };

  // POST /users
  create: Handler = async (req, res, next) => {
    try {
      const { name, email, phone, password, description, profilePictureUrl } =
        CreateUserRequestSchema.parse(req.body);

      const existingUser = await this.usersRepository.findByEmail(email);
      if (existingUser) throw new HttpError(400, 'Email já cadastrado');

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.usersRepository.create({
        name,
        email,
        phone,
        password: hashedPassword,
        description,
        profilePictureUrl,
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  // GET /users/:id
  show: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await this.usersRepository.findById(+id);
      if (!user) throw new HttpError(404, 'usuário não encontrado');

      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  // PUT /users/:id
  update: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await this.usersRepository.findById(+id);
      if (!user) throw new HttpError(404, 'Usuário não encontrado');

      let { name, email, phone, password, description, profilePictureUrl } =
        UpdateUserRequestSchema.parse(req.body);
      if (password) {
        password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await this.usersRepository.updateById(+id, {
        name,
        email,
        phone,
        password,
        description,
        profilePictureUrl,
      });

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  // DELETE /users/:id
  delete: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await this.usersRepository.findById(+id);
      if (!user) throw new HttpError(404, 'Usuário não encontrado');

      const deletedUser = await this.usersRepository.deleteById(+id);

      res.json(deletedUser);
    } catch (error) {
      next(error);
    }
  };
}
