import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../../dto/user/CreateUserDto";
import { BCryptConfig } from "../../security/BCryptConfig";
import { AppError } from "../../errors/AppError";

const prisma = new PrismaClient();

// Create first manager user if not existis anyone.
(async () => {
    const managers = await prisma.user.findMany({ where: { role: "MANAGER" } });
    if(managers.length === 0) {
        console.log("Defalt user created");
        await prisma.user.create({
            data: {
                name: "Manager",
                username: "admin",
                cpf: "",
                email: "admin@manager.com",
                role: "MANAGER",
                phone: "",
                password: "admin"
            }
        });
    }

})();


export class UserManagerService {
    public async create (user: CreateUserDto) {
        try {
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

        } catch (error) {
            if((error as Errors.prisma).code === "P2002") throw new AppError("User already exists", 409);
        }
    }
}
