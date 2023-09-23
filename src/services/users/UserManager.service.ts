import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { CreateUserDto } from "../../dto/user/CreateUserDto";
import { AsaasMethods } from "../../asaasMethods/AsaasMethods";

const prisma = new PrismaClient();
const asaas = new AsaasMethods();

export class UserManagerService {
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
                role: "MANAGER",
                phone: user.phone,
                password: await hash(user.password, 15),
                asaasId: asaasClient.id
            }
        });

        return { message: "User created successfully, go to login page.", statusCode: 201 };
    }
}
