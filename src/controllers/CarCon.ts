import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import CarSer from "../services/CarSer";

export default class CarCon {
  constructor(private carSer = new CarSer()) {}

  public create = async (req: Request, res: Response): Promise<Response> => {
    const body: ICar = req.body;
    const createdObj = await this.carSer.create(body);

    return res.status(201).send(createdObj);
  };

  public read = async (req: Request, res: Response): Promise<Response> => {
    const carList = await this.carSer.read();

    return res.status(200).send(carList);
  }
}