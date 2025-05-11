import { UsersController } from './controllers/UsersController';
import { PetsController } from './controllers/PetsController';
import { AddressController } from './controllers/AddressController';
import { PrismaUsersRepository } from './repositories/prisma/PrismaUsersRepository';
import { PrismaPetsRepository } from './repositories/prisma/PrismaPetsRepository';
import { PrismaAddressRepository } from './repositories/prisma/PrismaAddressRepository';
import { UsersService } from './services/UserServices';
import { PetsService } from './services/PetsService';
import { AddressService } from './services/AddressService';

// repositories
const usersRepository = new PrismaUsersRepository();
const petsRepository = new PrismaPetsRepository();
const addressRepository = new PrismaAddressRepository();

//services
export const usersService = new UsersService(usersRepository);
export const petsServcie = new PetsService(petsRepository);
export const addressService = new AddressService(addressRepository);

// controllers
export const usersController = new UsersController(usersService);
export const petsController = new PetsController(petsServcie);
export const addressController = new AddressController(addressService);
