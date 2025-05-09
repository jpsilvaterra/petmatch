import { UsersController } from './controllers/UsersController';
import { PetsController } from './controllers/PetsController';
import { AddressController } from './controllers/AddressController';
import { PrismaUsersRepository } from './repositories/prisma/PrismaUsersRepository';

const usersRepository = new PrismaUsersRepository();

export const usersController = new UsersController(usersRepository);
export const petsController = new PetsController();
export const addressController = new AddressController();
