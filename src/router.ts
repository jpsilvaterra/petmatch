import { Router } from 'express';
import { UsersController } from './controllers/UsersController';

const router = Router();

const usersController = new UsersController();

router.get('/users', usersController.index);
router.post('/users', usersController.create);
router.get('/users/:id', usersController.show);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);

// rota de teste
router.get('/status', async (req, res, next) => {
  try {
    res.json({ message: 'ok' });
  } catch (error) {
    next(error);
  }
});

export { router };
