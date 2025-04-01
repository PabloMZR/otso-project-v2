import { IsEmail, IsNumber, IsString, MaxLength } from "class-validator";

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
}
