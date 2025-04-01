import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    // @OneToMany(() => Location, (location) => location.locationId)
    // location: Location[];
    // Realcion con region
    // @OneToMany(() => Region, (region) => region.regionId)
    // region: Region[];
}
