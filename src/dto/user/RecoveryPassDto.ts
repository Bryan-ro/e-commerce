import { IsString, IsNotEmpty, IsStrongPassword } from "class-validator";

export class RecoveryPassDto {
    @IsNotEmpty()
    @IsString() 
    readonly login!: string;

    @IsNotEmpty()
    @IsString()
    readonly verificationCode!: string;

    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 1
    })
    readonly password!: string;
}
