import { Router } from 'express';
import { UsersController } from './controllers/UsersController';
import { PetsController } from './controllers/PetsController';
import { AddressController } from './controllers/AddressController';

const router = Router();

const usersController = new UsersController();
const petsController = new PetsController();
const addressControlelr = new AddressController();

// rotas para users
router.get('/users', usersController.index);
router.post('/users', usersController.create);
router.get('/users/:id', usersController.show);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);

//rotas para pets
router.get('/pets', petsController.index);
router.post('/pets', petsController.create);
router.get('/pets/:id', petsController.show);
router.put('/pets/:id', petsController.update);
router.delete('/pets/:id', petsController.delete);

//rotas para address
router.get('/address', addressControlelr.index);
router.post('/address', addressControlelr.create);
router.get('/address/:id', addressControlelr.show);
router.put('/address/:id', addressControlelr.udpate);
router.delete('/address/:id', addressControlelr.delete);

// rota de teste
router.get('/status', async (req, res, next) => {
  try {
    res.json({ message: 'ok' });
  } catch (error) {
    next(error);
  }
});

export { router };
