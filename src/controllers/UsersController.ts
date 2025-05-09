import { Handler } from 'express';
import { prisma } from '../database';
import bcrypt from 'bcryptjs';
import {
  CreateUserRequestSchema,
  UpdateUserRequestSchema,
} from '../schemas/UsersRequestSchema';
import { HttpError } from '../errors/HttpError';
import { checkEntityExists } from '../validators/checkEntityExists';

export class UsersController {
  // GET /users
  index: Handler = async (req, res, next) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
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
