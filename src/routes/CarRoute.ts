import { Router } from "express";
import CarCon from "../controllers/CarCon";

const CarRoute = Router();
const carCon = new CarCon();

CarRoute.post('/', carCon.create);

CarRoute.get('/', carCon.read);

export default CarRoute;