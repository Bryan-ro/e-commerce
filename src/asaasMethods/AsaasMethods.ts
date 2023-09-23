import env from "dotenv";
import { CreateClientDto } from "../dto/creditCard/CreateClientDto";
import { AppError } from "../errors/AppError";

env.config();

export class AsaasMethods {
    public async createClient (data: CreateClientDto) {
        try {
            const creation = await fetch(`${process.env.ASAAS_URL}/api/v3/customers`, {
                method: "POST",
                headers: {
                    access_token: `${process.env.ASAAS_TOKEN}`
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    cpfCnpj: "24067935838",
                })
            });

            return creation.json();
        } catch (error) {
            throw new AppError("Fail to create customer", 400);
        }
        

        
    }
}
