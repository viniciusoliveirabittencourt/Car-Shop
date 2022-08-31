import { Request, Response } from 'express';
import CarSer from '../services/CarSer';

export default class CarCon {
  constructor(private carSer = new CarSer()) {}

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;
    const createdObj = await this.carSer.create(body);

    return res.status(201).json(createdObj);
  };

  public read = async (_req: Request, res: Response): Promise<Response> => {
    const carList = await this.carSer.read();

    return res.status(200).json(carList);
  };

  public readOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const car = await this.carSer.readOne(id);

    return res.status(200).json(car);
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { body } = req;

    const carUpdate = await this.carSer.update(id, body);

    return res.status(200).json(carUpdate);
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    await this.carSer.delete(id);

    return res.status(204).json();
  };
}