import { Router } from 'express';
import MotoCon from '../controllers/MotoCon';

const MotoRoute = Router();
const motoCon = new MotoCon();

MotoRoute.post('/', motoCon.create);

MotoRoute.get('/', motoCon.read);

MotoRoute.get('/:id', motoCon.readOne);

MotoRoute.put('/:id', motoCon.update);

MotoRoute.delete('/:id', motoCon.delete);

export default MotoRoute;