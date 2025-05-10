import { UsersController } from './controllers/UsersController';
import { PetsController } from './controllers/PetsController';
import { AddressController } from './controllers/AddressController';
import { PrismaUsersRepository } from './repositories/prisma/PrismaUsersRepository';
import { PrismaPetsRepository } from './repositories/prisma/PrismaPetsRepository';

const usersRepository = new PrismaUsersRepository();
const petsRepository = new PrismaPetsRepository();

export const usersController = new UsersController(usersRepository);
export const petsController = new PetsController(petsRepository);
export const addressController = new AddressController();
