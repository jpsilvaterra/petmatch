import { Handler } from 'express';
import {
  CreateAddressRequestSchema,
  GetAddressRequestSchema,
  UpdateAddressRequestSchema,
} from '../schemas/AddressRequestSchema';
import { AddressService } from '../services/AddressService';

export class AddressController {
  constructor(private readonly addressService: AddressService) {}

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

      const result = await this.addressService.getAllAdress({
        street,
        state,
        zip,
        page: +page,
        pageSize: +pageSize,
        sortBy,
        order,
      });

      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  // POST /address
  create: Handler = async (req, res, next) => {
    try {
      const { street, state, zip } = CreateAddressRequestSchema.parse(req.body);

      const newAddress = await this.addressService.createAddress({
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

      const address = await this.addressService.getAddressById(+id);

      res.json(address);
    } catch (error) {
      next(error);
    }
  };

  // PUT /address/:id
  udpate: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { street, state, zip } = UpdateAddressRequestSchema.parse(req.body);

      const updatedAddress = await this.addressService.udpateAddress(+id, {
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

      const deletedAddress = await this.addressService.deleteAddress(+id);

      res.json(deletedAddress);
    } catch (error) {
      next(error);
    }
  };
}
