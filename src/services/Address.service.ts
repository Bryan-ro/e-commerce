import { PrismaClient } from "@prisma/client";
import { CreateAddressDto } from "../dto/address/CreateAdressDto";

const prisma = new PrismaClient();

export class AddressService {
    public async create (data: CreateAddressDto, id: number) {
        const formatCep = data.cep.replace("-", "");
        await prisma.address.create({
            data: {
                cep: formatCep,
                state: data.state,
                city: data.city,
                neighborhood: data.neighborhood,
                street: data.street,
                number: data.number,
                complement: data.complement,
                userId: id
            }
        });

        return { message: "Address successfully created", statusCode: 201 };
    }
}
