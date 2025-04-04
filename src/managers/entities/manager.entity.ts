import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {Location } from "src/locations/entities/location.entity"
import { User } from "src/auth/entities/user.entity";
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
    
    @OneToOne(() => User)
    @JoinColumn({
        name: "userId"
    })
    user: User;
}
