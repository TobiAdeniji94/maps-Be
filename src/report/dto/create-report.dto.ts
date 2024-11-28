import { Expose } from 'class-transformer';
import { CreateReportDataDto } from "./create-report-data.dto";
import { ReportScore } from '../entities/report-score.entity';
import { CreateReportScoreDto } from './create-report-score.dto';

export class CreateReportDto {
    id: string;

    createdById: string;

    nameOfOfficer: string;

    publishedById: string;

    publishedBy: string;

    reportDataId: string;

    @Expose({ name: 'reportData' })
    reportData: CreateReportDataDto;

    status: string;

    stateId: string;

    state: string;

    publishedOn: Date;

    createdAt: Date;

    updatedAt: Date;
}
