import { Handler } from 'express';
import { prisma } from '../database';
import {
  CreatePetRequestSchema,
  UpdatePetRequestSchema,
} from '../schemas/PetsRequestSchema';
import { HttpError } from '../errors/HttpError';
import { checkEntityExists } from '../validators/checkEntityExists';

export class PetsController {
  // GET /pets
  index: Handler = async (req, res, next) => {
    try {
      const pets = await prisma.pets.findMany();

      res.json(pets);
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
