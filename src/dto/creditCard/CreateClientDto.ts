import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, Validate } from "class-validator";
import { IsCpfValidConstraint } from "../../validations/IsValidCpf";

export class CreateClientDto {
    @IsNotEmpty()
    @IsString()
    readonly name!: string;

    @IsEmail()
    readonly email!: string;

    @IsPhoneNumber("BR")
    readonly phone!: string;
    
    @Validate(IsCpfValidConstraint)
    readonly cpf!: string;
}
