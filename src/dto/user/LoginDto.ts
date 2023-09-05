import { IsString, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    readonly login!: string;

    @IsNotEmpty()
    @IsString()
    readonly password!: string;
}
