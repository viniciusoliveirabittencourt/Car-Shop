import { ICar, carZodSchema } from "../interfaces/ICar";
import CarMod from "../models/CarMod";

export default class CarSer {
  constructor(private carMod = new CarMod()) {}

  public create = async (obj: ICar): Promise<ICar | null> => {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    return await this.carMod.create(obj);
  }

  public read = async (): Promise<ICar[]> => {
    return await this.carMod.read();
  }
}