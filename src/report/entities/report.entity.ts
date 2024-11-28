import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, ManyToMany, OneToOne } from 'typeorm';
import { ReportData } from './report-data.entity';
import { ReportScore } from './report-score.entity';

@Entity("reports")
export class Report {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' , nullable: true})
    createdById: string;

    @Column({ type: 'varchar', nullable: true })
    nameOfOfficer: string;

    @Column({ type: 'varchar', nullable: true})
    publishedById: string;

    @Column({ type: 'varchar', nullable: true})
    publishedBy: string;

    @Column({ type: 'varchar', nullable: true })
    reportDataId: string;

    @Column({ type: 'jsonb', nullable: true })
    reportData: ReportData;

    @Column( { default: false })
    status: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    publishedOn: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column({ type: 'varchar', nullable: true })
    state: string;

    @Column({ type: 'varchar' })
    stateId: string;
}
