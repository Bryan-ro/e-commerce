import { ArrayMinSize, IsArray, IsNumber, IsInt, IsNotEmpty, IsString, IsPositive } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
        title!: string;

    @IsNumber()
        price!: number;

    @IsString()
        description!: string;
    
    @IsInt()
    @IsPositive()
        stock!: number;
    
    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
        tags!: number[];
}
