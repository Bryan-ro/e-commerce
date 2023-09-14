import { PrismaClient } from "@prisma/client";
import { CreateAddressDto } from "../dto/address/CreateAdressDto";

const prisma = new PrismaClient();

export class AddressService {
    public async create (addressDto: CreateAddressDto) {

    }
}
