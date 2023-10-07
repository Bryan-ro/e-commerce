import { ArrayMinSize, IsArray, IsNumber, IsInt, IsNotEmpty, IsString, IsPositive, IsOptional } from "class-validator";

export class UpdateProductDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
        title?: string;

    @IsOptional()
    @IsNumber()
        price?: number;
    
    @IsOptional()
    @IsString()
        description?: string;
    
    @IsOptional()
    @IsInt()
    @IsPositive()
        stock?: number;
    
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
        tags?: number[];
}
