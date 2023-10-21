import { IsArray, IsInt, IsNotEmpty } from "class-validator";

interface orderItemProps {
    productId: number;
    quantity: number;
}

export class CreateOrderDto {
    @IsArray()
    @IsNotEmpty({
        each: true
    })
    readonly orderItem!: orderItemProps[]; 
    
    @IsInt()
    @IsNotEmpty()
    readonly addressId!: number;
}
