import { PrismaClient } from "@prisma/client";
import { TokenizeCardDto } from "../dto/creditCard/TokenizeCardDto";
import { AsaasMethods } from "../asaasMethods/AsaasMethods";


const prisma = new PrismaClient();
const asaas = new AsaasMethods();

export class CreditCardService {
    public async createCard(data: TokenizeCardDto, userId: number, ip: string) {
        const user = await prisma.user.findUnique({ 
            where: { 
                id: userId 
            },
            include: {
                addresses: true
            }
        });

        console.log("Passou pelo usuario");
        if(user) {
            const cardToken = await asaas.tokenizeCard({
                customer: user.asaasId,
                creditCard: data,
                creditCardHolderInfo: {
                    name: user.name,
                    email: user.email,
                    cpfCnpj: user.cpf,
                    phone: user.phone,
                    postalCode: user.addresses[0].cep,
                    addressNumber: (user.addresses[0].number).toString(),
                    addressComplement: user.addresses[0].complement
                },
                remoteIp: ip
            });

            console.log("Passou pelo card");
            await prisma.creditCard.create({
                data: {
                    cardToken: cardToken.creditCardToken,
                    userId: userId
                }
            });
        }      
        
        return { message: "Credit card successfully created", statusCode: 201 };
    }
}
