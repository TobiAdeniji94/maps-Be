import { configDotenv } from "dotenv";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "../../user/entities/user.entity";
import { Report } from "../../report/entities/report.entity";
import { ReportData } from "../../report/entities/report-data.entity";
import { TempReportData } from "../../report/entities/temp-report-data.entity";
import { ReportScore } from "../../report/entities/report-score.entity";
import { Actions } from "../../actions/entities/actions.entity";

configDotenv();

export const PostgresSqlDataSource: TypeOrmModuleOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [User, Report, ReportData, TempReportData, ReportScore, Actions],
  autoLoadEntities: true,
  synchronize: true,
  logging: false,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  }
};

