import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoMod';

const carSchema = new Schema<ICar>(
  {
    model: String,
    year: Number,
    color: String,
    status: Boolean,
    buyValue: Number,
    doorsQty: Number,
    seatsQty: Number,
  },
  { versionKey: false },
);

class CarMod extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Cars', carSchema)) {
    super(model);
  }
}

export default CarMod;