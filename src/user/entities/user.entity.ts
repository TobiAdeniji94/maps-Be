import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from '../enum/role.enum';
import { Report } from '../../report/entities/report.entity';
import { Expose } from 'class-transformer';

@Entity("users")
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 80 })
    firstName: string;

    @Column({ type: 'varchar', length: 80 })
    lastName: string;

    @Column({ type: 'varchar', length: 80, unique: true})
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.Viewer,
    })
    role: string;

    @Column({ type: 'varchar', nullable: true })
    state: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    lastLogin: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'varchar', nullable: true })
    refreshToken: string;

    @Column({ type: 'timestamp', nullable: true })
    accessToken: string;
}
