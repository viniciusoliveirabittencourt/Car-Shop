import { ErrorTypes } from '../errors/catalog';
import { ICar, carZodSchema } from '../interfaces/ICar';
import CarMod from '../models/CarMod';

export default class CarSer {
  constructor(private carMod = new CarMod()) {}

  public create = async (obj: ICar): Promise<ICar | null> => {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    return this.carMod.create(obj);
  };

  public read = async (): Promise<ICar[]> => this.carMod.read();

  public readOne = async (_id: string): Promise<ICar | null> => {
    const car = await this.carMod.readOne(_id);

    if (!car) {
      throw new Error(ErrorTypes.EntityNotFound);
    }

    return car;
  };

  public update = async (_id: string, obj: ICar): Promise<ICar> => {
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    const carUpdated = await this.carMod.update(_id, obj);

    if (!carUpdated) throw Error(ErrorTypes.EntityNotFound);

    return carUpdated;
  };

  public delete = async (_id: string): Promise<ICar> => {
    const car = await this.carMod.delete(_id);

    if (!car) throw Error(ErrorTypes.EntityNotFound);

    return car;
  };
}