import { PrismaClient } from "@prisma/client";
import { UpdatePersonalDataDto } from "../../dto/user/UpdatePersonalDataDto";

const prisma = new PrismaClient();

// Service for all types of users

export class UserUniversalService {
    public async getOneUser(id: number) {
        const user = await prisma.user.findUnique({ 
            where: { 
                id: id 
            }, 
            select: { 
                id: true,
                name: true,
                username: true,
                email: true,
                phone: true,
                cpf: true
            } 
        });

        return { ...user, statusCode: 200 };
    }

    public async getOwnUser (id: number) {
        const ownUser = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                phone: true,
                cpf: true
            }
        });

        return { ...ownUser, statusCode: 200 };
    }

    public async updatePersonalData (id: number, data: UpdatePersonalDataDto) {
        const user = await prisma.user.findUnique({ where: { id: id } });

        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: data.name ?? user?.name,
                username: data.username ?? user?.username,
                cpf: data.cpf ?? user?.cpf,
                email: data.cpf ?? user?.email,
                phone: data.phone ?? user?.phone
            }
        });

        return { message: "Personal data successfully updated", statusCode: 200 };
    }
}
