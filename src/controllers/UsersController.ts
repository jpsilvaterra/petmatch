import { Handler } from 'express';
import { prisma } from '../database';
import bcrypt from 'bcryptjs';
import {
  CreateUserRequestSchema,
  GetUsersRequestSchema,
  UpdateUserRequestSchema,
} from '../schemas/UsersRequestSchema';
import { HttpError } from '../errors/HttpError';
import { checkEntityExists } from '../validators/checkEntityExists';
import { Prisma } from '../../generated/prisma';

export class UsersController {
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

      const pageNumber = +page;
      const pageSizeNumber = +pageSize;

      const where: Prisma.UserWhereInput = {};

      if (name) where.name = { contains: name, mode: 'insensitive' };
      if (email) where.email = { contains: email, mode: 'insensitive' };
      if (phone) where.phone = { contains: phone };

      const users = await prisma.user.findMany({
        where,
        skip: (pageNumber - 1) * pageSizeNumber,
        take: pageSizeNumber,
        orderBy: { [sortBy]: order },
      });

      const total = await prisma.user.count({ where: where });

      res.json({
        data: users,
        meta: {
          page: pageNumber,
          pageSize: pageSizeNumber,
          total,
          totalPages: Math.ceil(total / pageSizeNumber),
        },
      });
    } catch (error) {
      next(error);
    }
  };

  // POST /users
  create: Handler = async (req, res, next) => {
    try {
      const { name, email, password, phone, profilePictureUrl, description } =
        CreateUserRequestSchema.parse(req.body);

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) throw new HttpError(400, 'Email já cadastrado');

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          phone,
          profilePictureUrl,
          description,
        },
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  // GET /users/:id
  show: Handler = async (req, res, next) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: +req.params.id },
        include: {
          pets: true,
          address: true,
        },
      });
      if (!user) throw new HttpError(404, 'usuário não encontrado');

      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  // PUT /users/:id
  update: Handler = async (req, res, next) => {
    try {
      await checkEntityExists(
        'user',
        'id',
        +req.params.id,
        'Usuário não encontrado'
      );

      const data = UpdateUserRequestSchema.parse(req.body);
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      const updatedUser = await prisma.user.update({
        data: data,
        where: { id: +req.params.id },
      });

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  // DELETE /users/:id
  delete: Handler = async (req, res, next) => {
    try {
      await checkEntityExists(
        'user',
        'id',
        +req.params.id,
        'Usuário não encontrado'
      );

      const deletedUser = await prisma.user.delete({
        where: { id: +req.params.id },
      });

      res.json(deletedUser);
    } catch (error) {
      next(error);
    }
  };
}
