import { IsInt, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Product } from "../entities/product.entity";
import { OmitType } from "@nestjs/mapped-types";
import { Provider } from "src/providers/entities/provider.entity";

export class CreateProductDto extends OmitType(Product, ['productId'] as const) {
    @IsString()
    @IsUUID('4')
    @IsOptional()
    productId: string;
    @IsString()
    @MaxLength(40)
    productName: string;
    @IsNumber()
    price: number;
    @IsInt()
    countSeal: number;
    @IsObject()
    provider: Provider
}
