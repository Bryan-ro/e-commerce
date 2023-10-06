import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { CreateUserDto } from "../../dto/user/CreateUserDto";

const prisma = new PrismaClient();

export class UserEmployeeService {
    public async create (user: CreateUserDto) {
        await prisma.user.create({
            data: {
                name: user.name,
                username: user.username,
                cpf: user.cpf,
                email: user.email,
                role: "EMPLOYEE",
                phone: user.phone,
                password: await hash(user.password, 15)
            }
        });

        return { message: "Employee created successfully", statusCode: 201 };
    }
}
