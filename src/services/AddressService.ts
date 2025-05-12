import { HttpError } from '../errors/HttpError';
import {
  IAddressRepository,
  IAddressWhereParams,
  ICreateAddressAttributes,
  IGetAddressParams,
} from '../repositories/AddressRepository';

export class AddressService {
  constructor(private readonly addressRepository: IAddressRepository) {}

  // busca todos os endereços
  async getAllAdress(params: IGetAddressParams) {
    const {
      street,
      state,
      zip,
      order,
      sortBy,
      page = 1,
      pageSize = 10,
    } = params;

    const limit = pageSize;
    const offset = (page - 1) * limit;

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

    return {
      data: address,
      meta: {
        page: +page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // cria um novo endereço
  async createAddress(params: ICreateAddressAttributes) {
    const newAddress = await this.addressRepository.create({
      street: params.street,
      state: params.state,
      zip: params.zip,
    });

    return newAddress;
  }

  // busca um endereço pelo ID
  async getAddressById(addressId: number) {
    const address = await this.addressRepository.findById(addressId);
    if (!address) throw new HttpError(404, 'Endereço não encontrado');

    return address;
  }

  // atualiza um endereço
  async udpateAddress(
    addressId: number,
    params: Partial<ICreateAddressAttributes>
  ) {
    const address = await this.addressRepository.findById(addressId);
    if (!address) throw new HttpError(404, 'Endereço não encontrado');

    const updatedAddress = await this.addressRepository.updateById(addressId, {
      street: params.street,
      state: params.state,
      zip: params.zip,
    });

    return updatedAddress;
  }

  // deleta um endereço
  async deleteAddress(addressId: number) {
    const address = await this.addressRepository.findById(addressId);
    if (!address) throw new HttpError(404, 'Endereço não encontrado');

    const deletedAddress = await this.addressRepository.deleteById(addressId);

    return deletedAddress;
  }
}
