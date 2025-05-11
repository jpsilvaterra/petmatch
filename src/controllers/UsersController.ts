import { Handler } from 'express';
import {
  CreateUserRequestSchema,
  GetUsersRequestSchema,
  UpdateUserRequestSchema,
} from '../schemas/UsersRequestSchema';
import { UsersService } from '../services/UserServices';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users
  index: Handler = async (req, res, next) => {
    try {
      const {
        name,
        email,
        phone,
        order,
        sortBy,
        page = '1',
        pageSize = '10',
      } = GetUsersRequestSchema.parse(req.query);

      const result = await this.usersService.getAllUsers({
        name,
        email,
        phone,
        order,
        sortBy,
        page: +page,
        pageSize: +pageSize,
      });

      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  // POST /users
  create: Handler = async (req, res, next) => {
    try {
      const { name, email, phone, password, description, profilePictureUrl } =
        CreateUserRequestSchema.parse(req.body);

      const newUser = await this.usersService.createUser({
        name,
        email,
        phone,
        password,
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

      const user = await this.usersService.getUserById(+id);

      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  // PUT /users/:id
  update: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const { name, email, phone, password, description, profilePictureUrl } =
        UpdateUserRequestSchema.parse(req.body);

      const updatedUser = await this.usersService.updateUser(+id, {
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

      const deletedUser = await this.usersService.deleteUser(+id);

      res.json(deletedUser);
    } catch (error) {
      next(error);
    }
  };
}
