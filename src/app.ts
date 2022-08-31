import express from 'express';
import 'express-async-errors';
import * as routes from './routes';
import errorHandler from './errors/error';

const app = express();
app.use(express.json());

app.use('/cars', routes.CarRoute);

app.use('/motorcycles', routes.MotoRoute);

app.use(errorHandler);

export default app;
