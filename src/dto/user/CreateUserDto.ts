import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, IsStrongPassword, Validate } from "class-validator";
import { IsCpfValidConstraint } from "../../configs/validations/IsValidCpf";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
        name!: string;
    
    @IsNotEmpty()
    @IsString()    
        username!: string;

    @Validate(IsCpfValidConstraint)
        cpf!: string;
        
    @IsEmail()    
        email!: string;

    @IsPhoneNumber("BR")
        phone!: string;

    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 1
    })
        password!: string;
}
