import { PrismaClient } from "@prisma/client";
import { JWTConfig } from "../../security/JWTConfig";
import { BCryptConfig } from "../../security/BCryptConfig";
import { AppError } from "../../errors/AppError";

const prisma = new PrismaClient();
const jwt = new JWTConfig();
const bcrypt = new BCryptConfig();

export class LoginService {
    public async login (login: string, password: string) {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: login },
                    { cpf: login },
                    { phone: login },
                    { phone: login }
                ]
            }
        });

        const verify = await bcrypt.comparePass(String(user?.password), password);
        
        if(!verify || !user) {
            throw new AppError("Invalid user or password", 401);
        }
        
        const jwtgenerate = jwt.sign({ username: user.username, email: user.email, role: user.role });

        return { message: "User logged in successfully", token: jwtgenerate, statusCode: 200 };
    }
}
