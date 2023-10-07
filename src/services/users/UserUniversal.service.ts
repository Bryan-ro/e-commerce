import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { UpdatePersonalDataDto } from "../../dto/user/UpdatePersonalDataDto";
import { UpdatePasswordDto } from "../../dto/user/UpdatePasswordDto";

const prisma = new PrismaClient();

// Service for all types of users

export class UserUniversalService {
    public async getUserByRoleAndIsActiveFilter(role: "MANAGER" |  "EMPLOYEE" | "CUSTOMER", isActive: boolean, page: number) {
        const pageSize = 20;
        const offset = (page - 1) * pageSize;

        const users = await prisma.user.findMany({
            where: {
                AND: [
                    { role: role },
                    { isActive: isActive }
                ]
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                phone: true,
                cpf: true,
                role: true
            },
            take: pageSize,
            skip: offset
        });

        const totalUsers = await prisma.user.count({
            where: {
                AND: [
                    { role: role },
                    { isActive: isActive }
                ]
            }
        });


        return {
            currentPage: page,
            totalPages: Math.ceil(totalUsers / pageSize),
            totalResults: totalUsers,
            users, 
            statusCode: 200 
        };
    }

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
        // const user = await prisma.user.findUnique({ where: { id: id } });

        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: data.name,
                username: data.username,
                cpf: data.cpf,
                email: data.email,
                phone: data.phone
            }
        });

        return { message: "Personal data successfully updated", statusCode: 200 };
    }

    public async updateOwnPassword (data: UpdatePasswordDto, id: number) {
        await prisma.user.update({
            where: {
                id
            },
            data: {
                password: await hash(data.newPassword,  15)
            }
        });

        return { message: "Password successfully updated", statusCode: 200 };
    }

    public async disableUser (id: number) {
        await prisma.user.update({
            where: {
                id
            },
            data: {
                isActive: false
            }
        });

        return { message: "Manager successfully deleted", statusCode: 200 };
    }

    public async activeUser (id: number) {
        await prisma.user.update({
            where: {
                id
            },
            data: {
                isActive: true
            }
        });

        return { message: "User reactivated", statusCode: 200 };
    }

}
