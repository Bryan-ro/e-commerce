import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../../dto/user/CreateUserDto";
import { BCryptConfig } from "../../security/BCryptConfig";

const prisma = new PrismaClient();

export class UserManagerService {
    public async create (user: CreateUserDto) {
        await prisma.user.create({
            data: {
                name: user.name,
                username: user.username,
                cpf: user.cpf,
                email: user.email,
                role: "MANAGER",
                phone: user.phone,
                password: await new BCryptConfig().hashPass(user.password)
            }
        });

        return { message: "User created successfully, go to login page.", statusCode: 201 };
    }
}
