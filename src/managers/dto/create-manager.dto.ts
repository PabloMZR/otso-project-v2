import { IsEmail, IsNumber, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "src/locations/entities/location.entity";

export class CreateManagerDto {
    @MaxLength(80)
    @IsString()
    managerFullName: string;
    @IsString()
    @IsEmail()
    managerEmail: string;
    @IsNumber()
    managerSalary: number;
    @IsString()
    @MaxLength(16)
    managerPhone: string;
    @IsObject()
    @IsOptional()
    location: Location
}
