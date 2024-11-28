import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { User } from '../user/entities/user.entity';
import { ReportData } from './entities/report-data.entity';
import { UserModule } from '../user/user.module';
import { StateModule } from '../state/state.module';
import { ActionsModule } from '../actions/actions.module';
import { Actions } from '../actions/entities/actions.entity';
import { ReportScore } from './entities/report-score.entity';
import { TempReportData } from './entities/temp-report-data.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Report, User, ReportData, Actions, ReportScore, TempReportData]),
    UserModule,
    StateModule,
    ActionsModule
  ],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
