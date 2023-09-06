import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { CreateUserDto } from "../../dto/user/CreateUserDto";

const prisma = new PrismaClient();

export class UserManagerService {
    public async getManagers() {
        return { managers: await prisma.user.findMany({ select: { name: true, username: true, email: true } }), 
            statusCode: 200 };
    }

    public async create (user: CreateUserDto) {
        await prisma.user.create({
            data: {
                name: user.name,
                username: user.username,
                cpf: user.cpf,
                email: user.email,
                role: "MANAGER",
                phone: user.phone,
                password: await hash(user.password, 15)
            }
        });

        return { message: "User created successfully, go to login page.", statusCode: 201 };
    }
}
