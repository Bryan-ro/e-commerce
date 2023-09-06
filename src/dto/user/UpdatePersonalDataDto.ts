import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, Validate, IsOptional } from "class-validator";
import { IsCpfValidConstraint } from "../../validations/IsValidCpf";

export class UpdatePersonalDataDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
        name?: string;
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()    
        username?: string;
    
    @IsOptional()
    @Validate(IsCpfValidConstraint)
        cpf?: string;
    
    @IsOptional()    
    @IsEmail()    
        email?: string;

    @IsOptional()
    @IsPhoneNumber("BR")
        phone?: string;
}
