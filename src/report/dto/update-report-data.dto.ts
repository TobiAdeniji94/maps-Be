import { PartialType } from '@nestjs/mapped-types';
import { CreateReportDataDto } from './create-report-data.dto';

export class UpdateReportDataDto extends PartialType(CreateReportDataDto) {}