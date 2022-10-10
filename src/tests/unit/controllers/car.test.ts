import { expect, assert } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import { carMock, carMockWhithId } from '../../mocks/carMock';
import CarController from '../../../controllers/CarCon';
import CarService from '../../../services/CarSer';
import CarModel from '../../../models/CarMod';

describe('car Controller', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel)
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMock);
    sinon.stub(carService, 'readOne').resolves(carMock);
    sinon.stub(carService, 'read').resolves([carMockWhithId]);
    sinon.stub(carService, 'update').resolves(carMockWhithId);
    sinon.stub(carService, 'delete').resolves(carMockWhithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Create a car', () => {
    it('Success', async () => {
      req.body = carMock;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('ReadOne car', () => {
    it('Success', async () => {
      req.params = { id: carMockWhithId._id};
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('Read all cars', () => {
    it('Success', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMockWhithId])).to.be.true;
    });
  });

  describe('Update a car', () => {
    it('Success', async () => {
      req.params = { id: carMockWhithId._id};
      req.body = carMock;
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWhithId)).to.be.true;
    });
  });
});