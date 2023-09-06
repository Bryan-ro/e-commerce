import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import env from "dotenv";
env.config();

const prisma = new PrismaClient();

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
        
        const jwtgenerate = sign(
            { 
                username: String(user?.username), 
                email: String(user?.email), 
                role: String(user?.role) 
            }, 
            String(process.env.JWT_TOKEN), 
            { 
                expiresIn: "1h"
            });


        return { message: "User logged in successfully", token: jwtgenerate, statusCode: 200 };
    }
}
