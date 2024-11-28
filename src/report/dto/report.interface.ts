import { User } from "src/user/entities/user.entity";
import { ReportData } from "../entities/report-data.entity";

export interface ReportInterface {
    id: string;
    createdBy: User;
    approvedBy: User;
    reportData: ReportData;
    approved?: boolean;
    createdAt: Date;
    updatedAt: Date;
    stateId: string;
}
