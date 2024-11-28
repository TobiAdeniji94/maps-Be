import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Report } from './report.entity';
import { Expose } from 'class-transformer';
import { type } from 'os';

@Entity('report_data')
export class ReportData {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', default: 0, nullable: true })
  ictFund: number;

  @Column({ type: 'int', default: 0, nullable: true })
  percentageOfBudget: number;

  @Column({ type: 'int', default: 0, nullable: true })
  presenceOfIctProjects: number;

  @Column({ type: 'int', default: 0, nullable: true })
  ictMinistry: number;

  @Column({ type: 'int', default: 0, nullable: true })
  stateIctPolicy: number;

  @Column({ type: 'int' , default: 0, nullable: true})
  officialMailUse: number;
  
  @Column({ type: 'int', default: 0, nullable: true})
  officialInternetProvision: number;

  @Column({ type: 'int', default: 0, nullable: true})
  officialInternetSpeed: number;

  @Column({ type: 'int', default: 0, nullable: true })
  videoConferenceUse: number;

  @Column({ type: 'int', default: 0, nullable: true })
  intranetUse: number;

  @Column({ type: 'int', default: 0, nullable: true })
  ict4Learning: number;

  @Column({ type: 'int', default: 0, nullable: true })
  ict4HealthRecords: number;

  @Column({ type: 'int', default: 0, nullable: true })
  presenceofTelemedicine: number;

  @Column({ type: 'int', default: 0, nullable: true })
  digitizedLandRecords: number;

  @Column({ type: 'int', default: 0, nullable: true })
  digitizedJudiciary: number;

  @Column({ type: 'int', default: 0, nullable: true })
  digitizedAgric: number;

  @Column({ type: 'int', default: 0, nullable: true })
  ecommerceIncentives: number;

  @Column({ type: 'int', default: 0, nullable: true })
  stateIctSystemDeploment: number;

  @Column({ type: 'int', default: 0, nullable: true })
  stateITDepartment: number;

  @Column({ type: 'int', default: 0, nullable: true  })
  digitizedFiling: number;

  @Column({ type: 'int', default: 0, nullable: true  })
  cyberSecurityInfra: number;

  @Column({ type: 'int', default: 0, nullable: true  })
  startupDb: number;

  @Column({ type: 'int', default: 0, nullable: true  })
  startupInvestmentVolume: number;

  @Column({ type: 'int', default: 0, nullable: true  })
  startUpDirectJobs: number;

  @Column({ type: 'int', default: 0, nullable: true  })
  stateWebsiteFunctionality: number;

  @Column({ type: 'int', default: 0, nullable: true  })
  stateWebsiteUI: number;

  @Column({ type: 'int', default: 0, nullable: true  })
  stateWebsiteSecurity: number;

  @Column({ type: 'int', default: 0, nullable: true  }) 
  iCTUpskill: number;
  
  @Column({ type: 'int', default: 0, nullable: true  })
  certifiedITPersonnel: number;

  @Column({ type: 'varchar', length: 80 })
  state: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  updatedAt: Date;
}