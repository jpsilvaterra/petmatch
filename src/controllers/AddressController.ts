import { Handler } from 'express';
import { prisma } from '../database';
import {
  CreateAddressRequestSchema,
  GetAddressRequestSchema,
  UpdateAddressRequestSchema,
} from '../schemas/AddressRequestSchema';
import { HttpError } from '../errors/HttpError';
import { checkEntityExists } from '../validators/checkEntityExists';
import { Prisma } from '../../generated/prisma';

export class AddressController {
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

      const pageNumber = +page;
      const pageSizeNumber = +pageSize;

      const where: Prisma.AddressWhereInput = {};

      if (street) where.street = { contains: street, mode: 'insensitive' };
      if (state) where.state = state;
      if (zip) where.zip = { contains: zip };

      const address = await prisma.address.findMany({
        where,
        skip: (pageNumber - 1) * pageSizeNumber,
        take: pageSizeNumber,
        orderBy: { [sortBy]: order },
      });

      const total = await prisma.address.count({ where: where });

      res.json({
        data: address,
        meta: {
          page: pageNumber,
          pageSize: pageSizeNumber,
          total,
          totalPages: Math.ceil(total / pageSizeNumber),
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

      const newAddress = await prisma.address.create({
        data: {
          street,
          state,
          zip,
        },
      });

      res.status(201).json(newAddress);
    } catch (error) {
      next(error);
    }
  };

  // GET /address/:id
  show: Handler = async (req, res, next) => {
    try {
      const address = await prisma.address.findUnique({
        where: { id: +req.params.id },
        include: {
          owners: true,
        },
      });
      if (!address) throw new HttpError(404, 'Endereço não encontrado');

      res.json(address);
    } catch (error) {
      next(error);
    }
  };

  // PUT /address/:id
  udpate: Handler = async (req, res, next) => {
    try {
      await checkEntityExists(
        'address',
        'id',
        +req.params.id,
        'Endereço não encontrado'
      );

      const data = UpdateAddressRequestSchema.parse(req.body);

      const updatedAddress = await prisma.address.update({
        data: data,
        where: { id: +req.params.id },
      });

      res.json(updatedAddress);
    } catch (error) {
      next(error);
    }
  };

  // DELETE /address/:id
  delete: Handler = async (req, res, next) => {
    try {
      await checkEntityExists(
        'address',
        'id',
        +req.params.id,
        'Endereço não encontrado'
      );

      const deletedAddress = await prisma.address.delete({
        where: { id: +req.params.id },
      });

      res.json(deletedAddress);
    } catch (error) {
      next(error);
    }
  };
}
