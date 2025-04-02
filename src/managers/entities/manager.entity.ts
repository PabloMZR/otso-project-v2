import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {Location } from "src/locations/entities/location.entity"
@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    managerId: number;
    @Column('text')
    managerFullName: string;
    @Column('float')
    managerSalary: number;
    @Column('text')
    managerPhone: string;
    @Column('text')
    managerEmail: string;
    @Column('text')
    managerPhoneNumber: string;

    // Realcion con location
     @OneToOne(() => Location)
     location: Location;
    // Realcion con region
    // @OneToMany(() => Region, (region) => region.regionId)
    // region: Region[];
}
