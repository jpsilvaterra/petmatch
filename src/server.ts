import cors from 'cors';
import express from 'express';
import { router } from './router';
import { errorHandlerMiddleware } from './middlewares/ErrorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}/`);
});
