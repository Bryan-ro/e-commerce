import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { CreateUserDto } from "../../dto/user/CreateUserDto";
import { AsaasMethods } from "../../asaasMethods/AsaasMethods";

const prisma = new PrismaClient();
const asaas = new AsaasMethods();

export class UserCustomerService {
    public async create (user: CreateUserDto) {
        const asaasClient = await asaas.createClient({
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            phone: user.phone
        });

        await prisma.user.create({
            data: {
                name: user.name,
                username: user.username,
                cpf: user.cpf,
                email: user.email,
                role: "CUSTOMER",
                phone: user.phone,
                password: await hash(user.password, 15),
                asaasId: asaasClient.id
            }
        });

        return { message: "Employee created successfully", statusCode: 201 };
    }
}
