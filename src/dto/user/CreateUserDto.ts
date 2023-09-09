import { IsString, IsEmail, IsPhoneNumber, IsStrongPassword, Validate, Length } from "class-validator";
import { IsCpfValidConstraint } from "../../validations/IsValidCpf";

export class CreateUserDto {
    @Length(5, 200)
    @IsString()
        name!: string;
    
    @Length(5, 30)
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
