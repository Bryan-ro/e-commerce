import { IsCreditCard, IsNumberString, Length } from "class-validator";

export class CardCreationDto {
    @IsCreditCard()
    readonly number!: string;

    @IsNumberString()
    @Length(2, 2)
    readonly exp_month!: number;

    @IsNumberString()
    @Length(4, 4)
    readonly exp_year!: number;

    @IsNumberString()
    @Length(3, 3)
    readonly cvc!: string; 
}

