import { Handler } from 'express';
import { GetUserPetsRequestSchema } from '../schemas/UsersRequestSchema';
import { Prisma } from '../../generated/prisma';
import { prisma } from '../database';
import { CreatePetRequestSchema } from '../schemas/PetsRequestSchema';
import { PetsService } from '../services/PetsService';

export class UserPetsController {
  //constructor(private readonly petsService: PetsService) {}

  // GET /users/:userId/pets
  getUserPets: Handler = async (req, res, next) => {
    try {
      const ownerId = +req.params.onwerId;
      const query = GetUserPetsRequestSchema.parse(req.query);
      const {
        name,
        page = '1',
        pageSize = '10',
        sortBy = 'name',
        order = 'asc',
      } = query;

      const pageNumber = +page;
      const pageSizeNumber = +pageSize;

      const where: Prisma.UserWhereInput = {
        pets: {
          some: { ownerId },
        },
      };

      if (name) where.name = { contains: name, mode: 'insensitive' };

      const owners = await prisma.user.findMany({
        where,
        orderBy: { [sortBy]: order },
        skip: (pageNumber - 1) * pageSizeNumber,
        take: pageSizeNumber,
        include: {
          pets: {
            select: {
              id: true,
              ownerId: true,
              name: true,
              breed: true,
              photoUrl: true,
              description: true,
              birthDate: true,
              status: true,
            },
          },
        },
      });

      const total = await prisma.user.count({ where });

      res.json({
        data: owners,
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

  // POST /users/:userId/pets
  registerPet: Handler = async (req, res, next) => {
    const ownerId = +req.params.ownerId;
    const { name, breed, birthDate, description, photoUrl, status } =
      CreatePetRequestSchema.parse(req.body);

    const newPet = await prisma.pets.create({
      data: {
        ownerId,
        name,
        breed,
        birthDate,
        description,
        photoUrl,
        status,
      },
    });

    res.status(201).json(newPet);
  };
  // PATCH /users/:userId/pets/:petId
}
