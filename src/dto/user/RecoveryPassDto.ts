import { IsString, IsNotEmpty, IsStrongPassword, IsEmail } from "class-validator";

export class RecoveryPassDto {
    @IsEmail()
    readonly login!: string;

    @IsNotEmpty()
    @IsString()
    readonly verificationCode!: string;

    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minLowercase: 1,
        minSymbols: 0
    })
    readonly password!: string;
}
