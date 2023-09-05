import { PrismaClient } from "@prisma/client";
import { JWTConfig } from "../../security/JWTConfig";

const prisma = new PrismaClient();
const jwt = new JWTConfig();

export class LoginService {
    public async login (login: string) {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: login },
                    { cpf: login },
                    { username: login },
                    { phone: login }
                ]
            }
        });
        
        const jwtgenerate = jwt.sign({ username: String(user?.username), email: String(user?.email), role: String(user?.role) });

        return { message: "User logged in successfully", token: jwtgenerate, statusCode: 200 };
    }
}
