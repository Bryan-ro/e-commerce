import { ArrayMinSize, IsArray, IsDecimal, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
        title!: string;

    @IsDecimal()
        price!: number;

    @IsString()
        description!: string;
    
    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
        tags!: number[];
}
