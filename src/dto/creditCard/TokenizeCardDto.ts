import { IsCreditCard, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";

export class TokenizeCardDto {
    @IsString()
    @IsNotEmpty()
    readonly holderName!: string;

    @IsCreditCard()
    readonly number!: string;

    @IsNumberString()
    @Length(2, 2)
    readonly expiryMonth!: string;

    @IsNumberString()
    @Length(4, 4)
    readonly expiryYear!: string;

    @IsNumberString()
    @Length(3, 3)
    readonly ccv!: string; 
}

