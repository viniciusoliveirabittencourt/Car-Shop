import { isValidObjectId, Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoMod<T> implements IModel<T> {
  constructor(private _model: Model<T>) {}

  async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    return this._model.findOne({ _id });
  }

  async read(): Promise<T[]> {
    return this._model.find({});
  }

  async update(_id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    return this._model.findByIdAndUpdate({ _id }, { ...obj }, { new: true });
  }

  async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    return this._model.findByIdAndRemove({ _id });
  }
}

export default MongoMod;