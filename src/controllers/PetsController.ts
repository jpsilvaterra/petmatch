import { Handler } from 'express';
import { prisma } from '../database';
import {
  CreatePetRequestSchema,
  GetPetsRequestSchema,
  UpdatePetRequestSchema,
} from '../schemas/PetsRequestSchema';
import { HttpError } from '../errors/HttpError';
import { checkEntityExists } from '../validators/checkEntityExists';
import { Prisma } from '../../generated/prisma';

export class PetsController {
  // GET /pets
  index: Handler = async (req, res, next) => {
    try {
      const {
        name,
        breed,
        status,
        page = '1',
        pageSize = '10',
        sortBy = 'name',
        order = 'asc',
      } = GetPetsRequestSchema.parse(req.query);

      const pageNumber = +page;
      const pageSizeNumber = +pageSize;

      const where: Prisma.PetsWhereInput = {};

      if (name) where.name = { contains: name, mode: 'insensitive' };
      if (breed) where.breed = { contains: breed, mode: 'insensitive' };
      if (status) where.status = status;

      const pets = await prisma.pets.findMany({
        where,
        skip: (pageNumber - 1) * pageSizeNumber,
        take: pageSizeNumber,
        orderBy: { [sortBy]: order },
      });

      const total = await prisma.pets.count({ where: where });

      res.json({
        data: pets,
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

  // POST /pets
  create: Handler = async (req, res, next) => {
    try {
      const { name, breed, birthDate, description, photoUrl, status } =
        CreatePetRequestSchema.parse(req.body);

      const newPet = await prisma.pets.create({
        data: {
          name,
          breed,
          birthDate,
          description,
          photoUrl,
          status,
        },
      });

      res.status(201).json(newPet);
    } catch (error) {
      next(error);
    }
  };

  // GET /pets/:id
  show: Handler = async (req, res, next) => {
    try {
      const pet = await prisma.pets.findUnique({
        where: { id: +req.params.id },
        include: {
          owner: true,
        },
      });
      if (!pet) throw new HttpError(404, 'Pet não encontrado');

      res.json(pet);
    } catch (error) {
      next(error);
    }
  };

  // PUT /pets/:id
  update: Handler = async (req, res, next) => {
    try {
      await checkEntityExists(
        'pets',
        'id',
        +req.params.id,
        'Pet não encontrado'
      );

      const data = UpdatePetRequestSchema.parse(req.body);

      const updatedPet = await prisma.pets.update({
        data: data,
        where: { id: +req.params.id },
      });

      res.json(updatedPet);
    } catch (error) {
      next(error);
    }
  };

  // DELETE /pets/:id
  delete: Handler = async (req, res, next) => {
    try {
      await checkEntityExists(
        'pets',
        'id',
        +req.params.id,
        'Pet não encontrado'
      );

      const deletedPet = await prisma.pets.delete({
        where: { id: +req.params.id },
      });
      res.json(deletedPet);
    } catch (error) {
      next(error);
    }
  };
}
