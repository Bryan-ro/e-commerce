import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { hash } from "bcrypt";
import memoryCache from "memory-cache";
import env from "dotenv";
import  recoveryPassMail from "../../mail/recoveryPassMail";
import { RecoveryPassDto } from "../../dto/user/RecoveryPassDto";
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
                id: user?.id,
                username: user?.username, 
                email: user?.email, 
                role: user?.role 
            }, 
            String(process.env.JWT_TOKEN), 
            { 
                expiresIn: "1h"
            });


        return { message: "User logged in successfully", token: jwtgenerate, statusCode: 200 };
    }


    public async requestForgotPassword (login: string) {
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

        const authCode = (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();

        memoryCache.put(authCode, user?.id, 300000);

        await recoveryPassMail(authCode, String(user?.name), String(user?.email));

        return { message: "Your verification code has been sent to your email.", statusCode: 200 };
    }

    public async forgotPasswordChange (data: RecoveryPassDto) {
        const userId = memoryCache.get(data.verificationCode);
        
        await prisma.user.update({
            where: { id: userId },
            data: {
                password: await  hash(data.password, 15)
            }
        });

        memoryCache.del(data.verificationCode);
        
        return { message: "Password successfully changed", statusCode: 200 };
    }
}
