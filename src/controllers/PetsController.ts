import { Handler } from 'express';
import {
  CreatePetRequestSchema,
  GetPetsRequestSchema,
  UpdatePetRequestSchema,
} from '../schemas/PetsRequestSchema';
import { PetsService } from '../services/PetsService';

export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  // GET /pets
  index: Handler = async (req, res, next) => {
    try {
      const {
        name,
        breed,
        status,
        order,
        sortBy,
        page = '1',
        pageSize = '10',
      } = GetPetsRequestSchema.parse(req.query);

      const result = await this.petsService.getAllPets({
        name,
        breed,
        status,
        page: +page,
        pageSize: +pageSize,
        sortBy,
        order,
      });

      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  // POST /pets
  create: Handler = async (req, res, next) => {
    try {
      const { name, breed, birthDate, description, photoUrl, status } =
        CreatePetRequestSchema.parse(req.body);

      const newPet = await this.petsService.createPet({
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

      const pet = await this.petsService.getPetById(+id);

      res.json(pet);
    } catch (error) {
      next(error);
    }
  };

  // PUT /pets/:id
  update: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, breed, birthDate, description, photoUrl, status } =
        UpdatePetRequestSchema.parse(req.body);

      const updatedPet = await this.petsService.udpatePet(+id, {
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

      const deletedPet = await this.petsService.deletePet(+id);

      res.json(deletedPet);
    } catch (error) {
      next(error);
    }
  };
}
