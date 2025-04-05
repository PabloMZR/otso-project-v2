import { ArrayNotEmpty, IsArray, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Region } from "src/regions/entities/region.entity";
//import { Location } from "../entities/location.entity";
export class CreateLocationDto  {
    @IsString()
    @MaxLength(30)
    locationName: string;
    @IsString()
    @MaxLength(160)
    locationAddress: string;
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[];
    @IsObject()
    @IsOptional()
    region: Region;
}
