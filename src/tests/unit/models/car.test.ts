import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/CarMod';
import { Model } from 'mongoose';
import { carMock, carMockWhithId, carUpdateMock, carupdateMockWhithId } from '../../mocks/carMock';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWhithId);
    sinon.stub(Model, 'findOne').resolves(carMockWhithId);
    sinon.stub(Model, 'find').resolves([carMockWhithId]);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carupdateMockWhithId);
    sinon.stub(Model, 'findByIdAndRemove').resolves(carMockWhithId);
  });

  after(() => {
    sinon.restore()
  })

  describe('creating a car', () => {
    it('successfully created', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWhithId);
    });
  });

  describe('searching a car', () => {
    it('successfuly found', async () => {
      const CarsFound = await carModel.readOne('62cf1fc6498565d94eba52cd');
      expect(CarsFound).to.be.deep.equal(carMockWhithId);
    })

    it('_id invalid', async () => {
      try {
        await carModel.readOne('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });

  describe('searching all cars', () => {
    it('return all Cars in the db', async () => {
      const CarsFound = await carModel.read();
      expect(CarsFound).to.be.deep.equal([carMockWhithId]);
    });
  });

  describe('updating a car', () => {
    it('successfully deleted', async () => {
      const CarDeleted = await carModel.update('62cf1fc6498565d94eba52cd', carUpdateMock);
      expect(CarDeleted).to.be.deep.equal(carupdateMockWhithId);
    });

    it('_id invalid', async () => {
      try {
        await carModel.update('123ERRADO', carUpdateMock);
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId')
      }
    });
  });

  describe('deleting car', () => {
    it('successfuly deleted', async () => {
      const CarDeleted = await carModel.delete('62cf1fc6498565d94eba52cd');
      expect(CarDeleted).to.be.deep.equal(carMockWhithId);
    });

    it('_id invalid', async () => {
      try {
        await carModel.delete('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });
});