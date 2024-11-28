import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Action } from '../enum/actions.enum';

@Entity("actions")
export class Actions {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: Action, default: Action.View})
    action: string;
    
    @Column({ type: 'varchar' , nullable: true})
    actor: string;

    @Column({ type: 'varchar', nullable: true})
    entityType: string;

    @Column({ type: 'varchar', nullable: true })
    entityId: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}
