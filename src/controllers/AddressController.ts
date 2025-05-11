import { Handler } from 'express';
import {
  CreateAddressRequestSchema,
  GetAddressRequestSchema,
  UpdateAddressRequestSchema,
} from '../schemas/AddressRequestSchema';
import { HttpError } from '../errors/HttpError';
import {
  IAddressRepository,
  IAddressWhereParams,
} from '../repositories/AddressRepository';

export class AddressController {
  private addressRepository: IAddressRepository;

  constructor(addressRepository: IAddressRepository) {
    this.addressRepository = addressRepository;
  }

  // GET /address
  index: Handler = async (req, res, next) => {
    try {
      const {
        street,
        state,
        zip,
        page = '1',
        pageSize = '10',
        sortBy = 'street',
        order = 'asc',
      } = GetAddressRequestSchema.parse(req.query);

      const limit = +pageSize;
      const offset = (+page - 1) * limit;

      const where: IAddressWhereParams = {};

      if (street) where.street = { like: street, mode: 'insensitive' };
      if (state) where.state = { like: state, mode: 'insensitive' };
      if (zip) where.zip = { like: zip };

      const address = await this.addressRepository.find({
        where,
        sortBy,
        order,
        limit: limit,
        offset: offset,
      });

      const total = await this.addressRepository.count(where);

      res.json({
        data: address,
        meta: {
          page: +page,
          pageSize: limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  };

  // POST /address
  create: Handler = async (req, res, next) => {
    try {
      const { street, state, zip } = CreateAddressRequestSchema.parse(req.body);

      const newAddress = await this.addressRepository.create({
        street,
        state,
        zip,
      });

      res.status(201).json(newAddress);
    } catch (error) {
      next(error);
    }
  };

  // GET /address/:id
  show: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const address = await this.addressRepository.findById(+id);
      if (!address) throw new HttpError(404, 'Endereço não encontrado');

      res.json(address);
    } catch (error) {
      next(error);
    }
  };

  // PUT /address/:id
  udpate: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const address = await this.addressRepository.findById(+id);
      if (!address) throw new HttpError(404, 'Endereço não encontrado');

      const { street, state, zip } = UpdateAddressRequestSchema.parse(req.body);

      const updatedAddress = await this.addressRepository.updateById(+id, {
        street,
        state,
        zip,
      });
      res.json(updatedAddress);
    } catch (error) {
      next(error);
    }
  };

  // DELETE /address/:id
  delete: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const address = await this.addressRepository.findById(+id);
      if (!address) throw new HttpError(404, 'Endereço não encontrado');

      const deletedAddress = await this.addressRepository.deleteById(+id);

      res.json(deletedAddress);
    } catch (error) {
      next(error);
    }
  };
}
