import { Router } from 'express';
import CarCon from '../controllers/CarCon';

const CarRoute = Router();
const carCon = new CarCon();

CarRoute.post('/', carCon.create);

CarRoute.get('/', carCon.read);

CarRoute.get('/:id', carCon.readOne);

CarRoute.put('/:id', carCon.update);

CarRoute.delete('/:id', carCon.delete);

export default CarRoute;