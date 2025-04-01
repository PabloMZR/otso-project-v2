import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
     @PrimaryGeneratedColumn("uuid")
     locationId: string;
     @Column({type: "text"})
     locationName: string;
     @Column({type: "text"})
     locationAddress: string;
     @Column({type: "simple-array"})
     locationLatLng: number[];
     //@Column({type: "text"})
     //email: string;
}
