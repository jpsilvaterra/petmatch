import { Handler } from 'express';
import {
  CreatePetRequestSchema,
  GetPetsRequestSchema,
  UpdatePetRequestSchema,
} from '../schemas/PetsRequestSchema';
import { HttpError } from '../errors/HttpError';
import {
  IPetsRepository,
  IPetWhereParams,
} from '../repositories/PetsRepository';

export class PetsController {
  private petsRepository: IPetsRepository;

  constructor(petsRepository: IPetsRepository) {
    this.petsRepository = petsRepository;
  }

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

      const limit = +pageSize;
      const offset = (+page - 1) * limit;

      const where: IPetWhereParams = {};

      if (name) where.name = { like: name, mode: 'insensitive' };
      if (breed) where.breed = { like: breed, mode: 'insensitive' };
      if (status) where.status = status;

      const pets = await this.petsRepository.find({
        where,
        sortBy,
        order,
        limit: limit,
        offset: offset,
      });

      const total = await this.petsRepository.count(where);

      res.json({
        data: pets,
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

  // POST /pets
  create: Handler = async (req, res, next) => {
    try {
      const { name, breed, birthDate, description, photoUrl, status } =
        CreatePetRequestSchema.parse(req.body);

      const newPet = await this.petsRepository.create({
        name,
        breed,
        birthDate,
        description,
        photoUrl,
        status: status ?? 'Unavailable',
      });

      res.status(201).json(newPet);
    } catch (error) {
      next(error);
    }
  };

  // GET /pets/:id
  show: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const pet = await this.petsRepository.findById(+id);
      if (!pet) throw new HttpError(404, 'Pet não encontrado');

      res.json(pet);
    } catch (error) {
      next(error);
    }
  };

  // PUT /pets/:id
  update: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const pet = await this.petsRepository.findById(+id);
      if (!pet) throw new HttpError(404, 'Pet não encontrado');

      const { name, breed, birthDate, description, photoUrl, status } =
        UpdatePetRequestSchema.parse(req.body);

      const updatedPet = await this.petsRepository.updateById(+id, {
        name,
        breed,
        birthDate,
        description,
        photoUrl,
        status,
      });

      res.json(updatedPet);
    } catch (error) {
      next(error);
    }
  };

  // DELETE /pets/:id
  delete: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const pet = await this.petsRepository.findById(+id);
      if (!pet) throw new HttpError(404, 'Pet não encontrado');

      const deletedPet = await this.petsRepository.deleteById(+id);

      res.json(deletedPet);
    } catch (error) {
      next(error);
    }
  };
}
