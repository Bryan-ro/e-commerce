import { IsPostalCode, IsString, IsNotEmpty, IsOptional, IsInt } from "class-validator";

export class CreateAddressDto  {
    @IsPostalCode("BR")
    readonly cep!: string;

    @IsNotEmpty()
    @IsString()
    readonly state!: string;

    @IsNotEmpty()
    @IsString()
    readonly city!: string;

    @IsNotEmpty()
    @IsString()
    readonly neighborhood!: string;

    @IsNotEmpty()
    @IsString()
    readonly street!: string;

    @IsNotEmpty()
    @IsInt()
    readonly number!: number;

    @IsOptional()
    @IsString()
    readonly complement!: string;
}
