import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('report_score')
export class ReportScore {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    stateId: string;

    @Column({ type: 'int', nullable: true })
    stateBudgetAllocation: number;

    @Column({ type: 'int', nullable: true })
    govSystems: number;

    @Column({ type: 'int', nullable: true })
    internetAvailSpeed: number;

    @Column({ type: 'int', nullable: true })
    levelIctReforms: number;

    @Column({ type: 'int', nullable: true })
    deploymentCompSystems: number;

    @Column({ type: 'int', nullable: true })
    startUpEcosystem: number;

    @Column({ type: 'int', nullable: true })
    statusStateWebsite: number;

    @Column({ type: 'int', nullable: true })
    staffIctProficiency: number;

    @Column({ type: 'numeric', nullable: true })
    totalScore: number;

    @Column({ type: 'varchar', nullable: true })
    reportDataId: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}