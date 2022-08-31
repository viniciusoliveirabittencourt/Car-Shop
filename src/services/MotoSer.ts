import { ErrorTypes } from '../errors/catalog';
import { IMotorcycle, motorcycleZodSchema } from '../interfaces/IMotorcycle';
import MotoMod from '../models/MotoMod';

export default class CarSer {
  constructor(private motoMod = new MotoMod()) {}

  public create = async (obj: IMotorcycle): Promise<IMotorcycle | null> => {
    const parsed = motorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    return this.motoMod.create(obj);
  };

  public read = async (): Promise<IMotorcycle[]> => this.motoMod.read();

  public readOne = async (_id: string): Promise<IMotorcycle | null> => {
    const car = await this.motoMod.readOne(_id);

    if (!car) {
      throw new Error(ErrorTypes.EntityNotFound);
    }

    return car;
  };

  public update = async (_id: string, obj: IMotorcycle)
  : Promise<IMotorcycle> => {
    const parsed = motorcycleZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    const carUpdated = await this.motoMod.update(_id, obj);

    if (!carUpdated) throw Error(ErrorTypes.EntityNotFound);

    return carUpdated;
  };

  public delete = async (_id: string): Promise<IMotorcycle> => {
    const car = await this.motoMod.delete(_id);

    if (!car) throw Error(ErrorTypes.EntityNotFound);

    return car;
  };
}