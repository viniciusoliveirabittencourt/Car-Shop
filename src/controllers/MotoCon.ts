import { Request, Response } from 'express';
import MotoSer from '../services/MotoSer';

export default class MotoCon {
  constructor(private motoSer = new MotoSer()) {}

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;
    const createdObj = await this.motoSer.create(body);

    return res.status(201).send(createdObj);
  };

  public read = async (_req: Request, res: Response): Promise<Response> => {
    const carList = await this.motoSer.read();

    return res.status(200).send(carList);
  };

  public readOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const car = await this.motoSer.readOne(id);

    return res.status(200).send(car);
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { body } = req;

    const carUpdate = await this.motoSer.update(id, body);

    return res.status(200).send(carUpdate);
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    await this.motoSer.delete(id);

    return res.status(204).send();
  };
}