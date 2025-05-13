import { Router } from 'express';
import {
  addressController,
  petsController,
  userPetsController,
  usersController,
} from './container';

const router = Router();

// rotas para users
router.get('/users', usersController.index);
router.post('/users', usersController.create);
router.get('/users/:id', usersController.show);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);

// rotas para pets
router.get('/pets', petsController.index);
router.post('/pets', petsController.create);
router.get('/pets/:id', petsController.show);
router.put('/pets/:id', petsController.update);
router.delete('/pets/:id', petsController.delete);

// rotas para address
router.get('/address', addressController.index);
router.post('/address', addressController.create);
router.get('/address/:id', addressController.show);
router.put('/address/:id', addressController.udpate);
router.delete('/address/:id', addressController.delete);

// rotas para userPets
router.get('/users/:ownerId/pets', userPetsController.getUserPets);
router.post('/users/:ownerId/pets', userPetsController.registerPet);

// rota de teste
router.get('/status', async (req, res, next) => {
  try {
    res.json({ message: 'ok' });
  } catch (error) {
    next(error);
  }
});

export { router };
