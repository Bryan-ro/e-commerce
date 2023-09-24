declare namespace AsaasTypes {
    interface tokenizeCard {
        customer: string;
        creditCard: {
            holderName: string;
            number: string;
            expiryMonth: string;
            expiryYear: string;
            ccv: string;
        },
        creditCardHolderInfo: {
            name: string,
            email: string,
            cpfCnpj: string,
            postalCode: string,
            addressNumber: string,
            addressComplement: string | null,
            phone: string
        },
        remoteIp: string
    }
}
