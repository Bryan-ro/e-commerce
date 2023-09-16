import { IsEmail } from "class-validator";

export class RequestRecoveryPassDto {
    @IsEmail()
    readonly login!: string;
}
