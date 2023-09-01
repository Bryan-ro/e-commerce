import { IsString, IsEmail, IsIdentityCard, IsNotEmpty, IsPhoneNumber, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
        name!: string;
    
    @IsNotEmpty()
    @IsString()    
        user!: string;

    @IsIdentityCard()
        cpf!: string;
        
    @IsEmail()    
        email!: string;

    @IsNotEmpty()
        role!: "CUSTOMER" | "MANAGER" | "EMPLOYEE";

    @IsPhoneNumber()
        tel!: string;

    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 1
    })
        password!: string;
}