import env from "dotenv";
import { CreateClientDto } from "../dto/creditCard/CreateClientDto";
import { AppError } from "../errors/AppError";

env.config();

export class AsaasMethods {
    public async createClient (data: CreateClientDto) {
        const creation = await fetch(`${process.env.ASAAS_URL}/api/v3/customers`, {
            method: "POST",
            headers: {
                access_token: `${process.env.ASAAS_TOKEN}`
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                phone: data.phone,
                cpfCnpj: data.cpf,
            })
        });

        if(creation.status !== 200) {
            throw new AppError("Failed to create client", creation.status);
        }

        return creation.json(); 
    }

    public async tokenizeCard(data: AsaasTypes.tokenizeCard) {
        const tokenize = await fetch(`${process.env.ASAAS_URL}/api/v3/creditCard/tokenize`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                access_token: `${process.env.ASAAS_TOKEN}`
            },
            body: JSON.stringify(data)
        });

        if(tokenize.status !== 200) {
            throw new AppError("Failed to create client", tokenize.status);
        }
        console.log(await tokenize.json());
        return await tokenize.json(); 
    }
}
