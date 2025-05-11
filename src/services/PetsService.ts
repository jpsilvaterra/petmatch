import { HttpError } from '../errors/HttpError';
import {
  ICreatePetAttributes,
  IGetPetsParams,
  IPetsRepository,
  IPetWhereParams,
} from '../repositories/PetsRepository';

export class PetsService {
  constructor(private readonly petsRepository: IPetsRepository) {}

  async getAllPets(params: IGetPetsParams) {
    const {
      name,
      breed,
      status,
      sortBy,
      order,
      page = 1,
      pageSize = 10,
    } = params;

    const limit = pageSize;
    const offset = (page - 1) * limit;

    const where: IPetWhereParams = {};

    if (name) where.name = { like: name, mode: 'insensitive' };
    if (breed) where.breed = { like: breed, mode: 'insensitive' };
    if (status) where.status = status;

    const pets = await this.petsRepository.find({
      where,
      sortBy,
      order,
      limit,
      offset,
    });

    const total = await this.petsRepository.count(where);

    return {
      data: pets,
      meta: {
        page: +page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createPet(params: ICreatePetAttributes) {
    const newPet = await this.petsRepository.create({
      name: params.name,
      breed: params.breed,
      birthDate: params.birthDate,
      description: params.description,
      photoUrl: params.photoUrl,
      status: params.status,
    });

    return newPet;
  }

  async getPetById(petId: number) {
    const pet = await this.petsRepository.findById(petId);
    if (!pet) throw new HttpError(404, 'Pet não encontrado');

    return pet;
  }

  async udpatePet(petId: number, params: Partial<ICreatePetAttributes>) {
    const pet = await this.petsRepository.findById(petId);
    if (!pet) throw new HttpError(404, 'Pet não encontrado');

    const updatedPet = await this.petsRepository.updateById(petId, {
      name: params.name,
      breed: params.breed,
      birthDate: params.birthDate,
      description: params.description,
      photoUrl: params.photoUrl,
      status: params.status,
    });

    return updatedPet;
  }

  async deletePet(petId: number) {
    const pet = await this.petsRepository.findById(petId);
    if (!pet) throw new HttpError(404, 'Pet não encontrado');

    const deletedPet = await this.petsRepository.deleteById(petId);

    return deletedPet;
  }
}
