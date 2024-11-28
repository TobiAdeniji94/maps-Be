import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Report } from './report.entity';
import { Expose } from 'class-transformer';
import { type } from 'os';

@Entity('temp_report_data')
export class TempReportData {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'numeric' })
  ictFund: number;

  @Column({ type: 'numeric' })
  percentageOfBudget: number;

  @Column({ type: 'numeric' })
  presenceOfIctProjects: number;

  @Column({ type: 'numeric' })
  ictMinistry: number;

  @Column({ type: 'numeric'})
  stateIctPolicy: number;

  @Column({ type: 'numeric' })
  officialMailUse: number;
  
  @Column({ type: 'numeric' })
  officialInternetProvision: number;

  @Column({ type: 'numeric' })
  officialInternetSpeed: number;

  @Column({ type: 'numeric' })
  videoConferenceUse: number;

  @Column({ type: 'numeric' })
  intranetUse: number;

  @Column({ type: 'numeric' })
  ict4Learning: number;

  @Column({ type: 'numeric' })
  ict4HealthRecords: number;

  @Column({ type: 'numeric' })
  presenceofTelemedicine: number;

  @Column({ type: 'numeric' })
  digitizedLandRecords: number;

  @Column({ type: 'numeric' })
  digitizedJudiciary: number;

  @Column({ type: 'numeric' })
  digitizedAgric: number;

  @Column({ type: 'numeric' })
  ecommerceIncentives: number;

  @Column({ type: 'numeric' })
  stateIctSystemDeploment: number;

  @Column({ type: 'numeric' })
  stateITDepartment: number;

  @Column({ type: 'numeric' })
  digitizedFiling: number;

  @Column({ type: 'numeric' })
  cyberSecurityInfra: number;

  @Column({ type: 'numeric' })
  startupDb: number;

  @Column({ type: 'numeric' })
  startupInvestmentVolume: number;

  @Column({ type: 'numeric' })
  startUpDirectJobs: number;

  @Column({ type: 'numeric' })
  stateWebsiteFunctionality: number;

  @Column({ type: 'numeric' })
  stateWebsiteUI: number;

  @Column({ type: 'numeric' })
  stateWebsiteSecurity: number;

  @Column({ type: 'numeric' }) 
  iCTUpskill: number;
  
  @Column({ type: 'numeric' })
  certifiedITPersonnel: number;

  @Column({ type: 'varchar', length: 80 })
  state: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  updatedAt: Date;
}