import { IsString, IsEmail, IsPhoneNumber, Validate, IsOptional, Length } from "class-validator";
import { IsCpfValidConstraint } from "../../validations/IsValidCpf";

export class UpdatePersonalDataDto {
    @IsOptional()
    @Length(5, 200)
    @IsString()
        name?: string;
    
    @IsOptional()
    @Length(5, 30)
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
