import { IsEmail, MinLength, IsString, IsOptional, IsIn } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    userEmail: string;
    @IsString()
    @MinLength(8)
    userPassword: string;
    @IsOptional()
    @IsIn(["Admin", "Employee","User"])
    userRoles: string[];
}
