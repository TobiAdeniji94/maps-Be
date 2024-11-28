import { Injectable } from '@nestjs/common';
import { CreateReportDataDto } from './dto/create-report-data.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { UserService } from '../user/user.service';
import { StateService } from '../state/state.service';
import { ReportData } from './entities/report-data.entity';
import { ResponseMessage, responseMessage } from 'src/utils/response-message';
import { ReportDataInterface } from './dto/report-data.interface';
import { ActionsService } from '../actions/actions.service';
import { User } from '../user/entities/user.entity';
import { Actions } from 'src/actions/entities/actions.entity';
import { UserDetail } from './dto/userDetail.interface';
import { ReportScore } from './entities/report-score.entity';
import { TempReportData } from './entities/temp-report-data.entity';
import * as _ from 'lodash';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,

    @InjectRepository(ReportData)
    private readonly reportDataRepository: Repository<ReportData>,

    @InjectRepository(ReportScore)
    private readonly reportScoreRepository: Repository<ReportScore>,

    @InjectRepository(TempReportData)
    private readonly tempReportDataRepository: Repository<TempReportData>,

    @InjectRepository(Actions)
    private readonly actionsRepository: Repository<Actions>,

    private readonly userService: UserService,
    private readonly stateService: StateService,
    private readonly actionsService: ActionsService,
  ) {}

  async createReportData2(reportData: CreateReportDataDto, user: UserDetail): Promise<ReportData | ResponseMessage> {
    try {
      reportData.ictFund = parseInt(reportData.ictFund.toString(), 10);
      reportData.percentageOfBudget = parseInt(reportData.percentageOfBudget.toString(), 10);
      reportData.presenceOfIctProjects = parseInt(reportData.presenceOfIctProjects.toString(), 10);
      reportData.ictMinistry = parseInt(reportData.ictMinistry.toString(), 10);
      reportData.stateIctPolicy  = parseInt(reportData.stateIctPolicy.toString(), 10);
      reportData.officialMailUse = parseInt(reportData.officialMailUse.toString(), 10);
      reportData.officialInternetProvision = parseInt(reportData.officialInternetProvision.toString(), 10);
      reportData.officialInternetSpeed = parseInt(reportData.officialInternetSpeed.toString(), 10);
      reportData.videoConferenceUse = parseInt(reportData.videoConferenceUse.toString(), 10);
      reportData.intranetUse = parseInt(reportData.intranetUse.toString(), 10);
      reportData.ict4Learning = parseInt(reportData.ict4Learning.toString(), 10);
      reportData.ict4HealthRecords = parseInt(reportData.ict4HealthRecords.toString(), 10);
      reportData.presenceofTelemedicine = parseInt(reportData.presenceofTelemedicine.toString(), 10);
      reportData.digitizedLandRecords = parseInt(reportData.digitizedLandRecords.toString(), 10);
      reportData.digitizedJudiciary = parseInt(reportData.digitizedJudiciary.toString(), 10);
      reportData.digitizedAgric = parseInt(reportData.digitizedAgric.toString(), 10);
      reportData.ecommerceIncentives = parseInt(reportData.ecommerceIncentives.toString(), 10);
      reportData.stateIctSystemDeploment = parseInt(reportData.stateIctSystemDeploment.toString(), 10);
      reportData.stateITDepartment = parseInt(reportData.stateITDepartment.toString(), 10);
      reportData.digitizedFiling = parseInt(reportData.digitizedFiling.toString(), 10);
      reportData.cyberSecurityInfra = parseInt(reportData.cyberSecurityInfra.toString(), 10);
      reportData.startupDb = parseInt(reportData.startupDb.toString(), 10);
      reportData.startupInvestmentVolume = parseInt(reportData.startupInvestmentVolume.toString(), 10);
      reportData.startUpDirectJobs = parseInt(reportData.startUpDirectJobs.toString(), 10);
      reportData.stateWebsiteFunctionality = parseInt(reportData.stateWebsiteFunctionality.toString(), 10);
      reportData.stateWebsiteUI = parseInt(reportData.stateWebsiteUI.toString(), 10);
      reportData.stateWebsiteSecurity = parseInt(reportData.stateWebsiteSecurity.toString(), 10);
      reportData.iCTUpskill = parseInt(reportData.iCTUpskill.toString(), 10);
      reportData.certifiedITPersonnel = parseInt(reportData.certifiedITPersonnel.toString(), 10);

      const exsistingReportData = await this.reportDataRepository.findOne({where: {state: reportData.state}});
      if (exsistingReportData) {
        // console.log('exsistingReportData', exsistingReportData);
        return responseMessage(false, 'Report Data already exists', [], [exsistingReportData.id]);
      }

      if (!exsistingReportData) {
        const newReportData = this.reportDataRepository.create(reportData);
        const result = await this.reportDataRepository.save(newReportData);
        // console.log('result', result.id);

        // console.log('newReportData', result);

        const state = await this.stateService.getStateByName(reportData.state);

        await this.createReport2(user.firstName, user.lastName, user.sub, result.id, result, state.name, state.id);
        // console.log('user', user.sub, user.firstName, user.lastName, result.id, state.name, state.id);
        
        // console.log('report', report);
        
        await this.calculateScore(result);
        return responseMessage(true, 'Report created successfully', [], newReportData);
      }
    } catch (error) {
      return responseMessage(false, "An error occured while creating report data", [error.message]);
    }
  }

  async createReport2( firstName: string, lastName: string, createdById: string, reportDataId: string, reportData: object, state: string, stateId: string ): Promise<Report | ResponseMessage> {
    try {
      const newReport = new Report();
      newReport.nameOfOfficer = firstName + ' ' + lastName;
      newReport.createdById = createdById;
      newReport.publishedBy = 'pending';
      newReport.publishedById = 'pending';
      newReport.reportDataId = reportDataId;
      newReport.reportData = reportData as ReportData;
      newReport.status = 'not published';
      newReport.state = state;
      newReport.stateId = stateId;

      const res = await this.reportRepository.save(newReport);
      // console.log('res', res);

      // await this.actionsService.createAction('Create', createdById, 'Report', res.id);
      
      return newReport;
    } catch (error) {
      return responseMessage(false, "An error occured while creating report", [error.message]);
    }
  }

  async createOrUpdateReportData(createReportData: CreateReportDataDto, user: UserDetail): Promise<ReportData | ResponseMessage> {
    // console.log('createReportData user', user);
    try {
      const exsistingReport = await this.reportRepository.findOne({where: { state: createReportData.state, createdById: user.sub }});
      

      if (exsistingReport) {
        // console.log('exsistingReport', exsistingReport);
        const reportData = await this.reportDataRepository.findOne({where: {id: exsistingReport.reportDataId}});
        const isReportDataChanged = this.isReportDataChanged(reportData, createReportData);
        console.log('save reportData', reportData);
        console.log('save isReportDataChanged', isReportDataChanged);

        if (isReportDataChanged) {
          const updateReportData = await this.updateReportData(reportData.id, createReportData);
        // console.log('updateReportData', updateReportData);

          exsistingReport.updatedAt = new Date();

          return responseMessage(true, 'Report Data updated successfully', [], updateReportData);
        } else {
          return responseMessage(false, 'Report Data remians unchanged', [], reportData);
        }
      } else {
        const newReportData = await this.createReportData2(createReportData, user);
        // console.log('newReportData', newReportData);
        return responseMessage(true, 'Report Data does not exist', [], newReportData);
      }
    } catch (error) {
      return responseMessage(false, "An error occured while creating report data", [error.message]);
    }
  }

  async submitReportData(createReportData: CreateReportDataDto, user: UserDetail): Promise<ReportData | ResponseMessage> {
    // console.log('createReportData user', user);
    try {
      const exsistingReport = await this.reportRepository.findOne({where: { state: createReportData.state, createdById: user.sub }});

      if (exsistingReport) {
        // console.log('exsistingReport', exsistingReport);
        const reportData = await this.reportDataRepository.findOne({where: {id: exsistingReport.reportDataId}});
        // console.log('submit reportData', reportData);
        const isReportDataChanged = this.isReportDataChanged(reportData, createReportData);
        // console.log('submit isReportDataChanged', isReportDataChanged);
        if (isReportDataChanged) {
          const updateReportData = await this.updateReportData(reportData.id, createReportData);

          if (!exsistingReport.publishedOn) {
            
            await this.calculateScore(updateReportData as CreateReportDataDto);
            // console.log('submit updateReportData');
            exsistingReport.publishedOn = new Date();
          } 

          exsistingReport.updatedAt = new Date();
          return responseMessage(true, 'Report Data submitted successfully', [], updateReportData); 
        } else {
          return responseMessage(false, 'Report Data remians unchanged', [], reportData);
        }
      } else {
        const newReportData = await this.createReportData2(createReportData, user);
        return responseMessage(true, 'Report Data created and submitted successfully', [], newReportData);
      }
    } catch (error) {
      return responseMessage(false, "An error occured while creating report data", [error.message]);
    }
  }

  private isReportDataChanged(existingData: ReportData, newData: CreateReportDataDto): boolean {
    return (
      existingData.ictFund !== newData.ictFund ||
      existingData.percentageOfBudget !== newData.percentageOfBudget ||
      existingData.presenceOfIctProjects !== newData.presenceOfIctProjects ||
      existingData.ictMinistry !== newData.ictMinistry ||
      existingData.stateIctPolicy !== newData.stateIctPolicy ||
      existingData.officialMailUse !== newData.officialMailUse ||
      existingData.officialInternetProvision !== newData.officialInternetProvision ||
      existingData.officialInternetSpeed !== newData.officialInternetSpeed ||
      existingData.videoConferenceUse !== newData.videoConferenceUse ||
      existingData.intranetUse !== newData.intranetUse ||
      existingData.ict4Learning !== newData.ict4Learning ||
      existingData.ict4HealthRecords !== newData.ict4HealthRecords ||
      existingData.presenceofTelemedicine !== newData.presenceofTelemedicine ||
      existingData.digitizedLandRecords !== newData.digitizedLandRecords ||
      existingData.digitizedJudiciary !== newData.digitizedJudiciary ||
      existingData.digitizedAgric !== newData.digitizedAgric ||
      existingData.ecommerceIncentives !== newData.ecommerceIncentives ||
      existingData.stateIctSystemDeploment !== newData.stateIctSystemDeploment ||
      existingData.stateITDepartment !== newData.stateITDepartment ||
      existingData.digitizedFiling !== newData.digitizedFiling ||
      existingData.cyberSecurityInfra !== newData.cyberSecurityInfra ||
      existingData.startupDb !== newData.startupDb ||
      existingData.startupInvestmentVolume !== newData.startupInvestmentVolume ||
      existingData.startUpDirectJobs !== newData.startUpDirectJobs ||
      existingData.stateWebsiteFunctionality !== newData.stateWebsiteFunctionality ||
      existingData.stateWebsiteUI !== newData.stateWebsiteUI ||
      existingData.stateWebsiteSecurity !== newData.stateWebsiteSecurity ||
      existingData.iCTUpskill !== newData.iCTUpskill ||
      existingData.certifiedITPersonnel !== newData.certifiedITPersonnel ||
      existingData.state !== newData.state
    );
  }

  async publishReport(reportId: string, actor: any): Promise<Report | ResponseMessage> {
    try {
      const report = await this.reportRepository.findOne({where: {id: reportId}});

      if (!report) {
        return responseMessage(false, 'Report not found');
      }

      if (report.status === 'not published') {
        report.status = 'published';
        report.publishedBy = actor.firstName + ' ' + actor.lastName;
        report.publishedById = actor.sub;
        report.publishedOn = new Date();
        report.updatedAt = new Date();

        await this.reportRepository.save(report);

        // await this.actionsService.createAction('Publish', actor.firstName, actor.lastName, 'Report', report.id);

        return responseMessage(true, 'Report approved successfully', [], report);
      } else {
        return responseMessage(false, 'Report already approved');
      }
    } catch (error) {
      return responseMessage(false, "An error occured while approving report", [error.message]);
    }
  }

  async deleteReport(id: string, actor: any): Promise<ResponseMessage> {
    try {
      const report = await this.reportRepository.findOne({where: {id}});
    
    if (!report) {
      return responseMessage(false, 'Report not found');
    }

    if (report.reportDataId) {
      await this.reportDataRepository.delete(report.reportDataId);
      await this.reportScoreRepository.delete({ reportDataId: report.reportDataId });
    }

    await this.reportRepository.delete(id);

    // await this.actionsService.createAction('Delete', actor.firstName, actor.lastName, 'Report', report.id);

    return responseMessage(true, 'Report deleted successfully');
    } catch (error) {
      return responseMessage(false, "An error occured while deleting report", [error.message]);
    }
  }

  async deleteReportData(id: string): Promise<ResponseMessage> {
    try {
      const reportData = await this.reportDataRepository.findOne({where: {id}});
    
      if (!reportData) {
        return responseMessage(false, 'Report Data not found');
      }

      await this.reportDataRepository.delete(id);

      // await this.actionsService.createAction('Delete', actor.firstName, actor.lastName, 'Report Data', reportData.id);

      return responseMessage(true, 'Report Data deleted successfully');
    } catch (error) {
      return responseMessage(false, "An error occured while deleting report data", [error.message]);
    }
  }

  async deleteReportScore(id: string): Promise<ResponseMessage> {
    try {
      const reportData = await this.reportScoreRepository.findOne({where: {id}});
    
      if (!reportData) {
        return responseMessage(false, 'Report Data not found');
      }

      await this.reportScoreRepository.delete(id);

      // await this.actionsService.createAction('Delete', actor.firstName, actor.lastName, 'Report Score', reportData.id);

      return responseMessage(true, 'Report Score deleted successfully');
    } catch (error) {
      return responseMessage(false, "An error occured while deleting report data", [error.message]);
    }
  }

  async declineReport(reportId: string, actor: any): Promise<Report | ResponseMessage> {
    try {
      const report = await this.reportRepository.findOne({where: {id: reportId}});

      if (!report) {
        return responseMessage(false, 'Report not found');
      }

      report.status = 'declined';
      report.publishedBy = actor.firstName + ' ' + actor.lastName;
      report.publishedById = actor.sub;
      report.publishedOn = new Date();
      report.updatedAt = new Date();

      await this.reportRepository.save(report);

      // await this.actionsService.createAction('Decline', actor.firstName, actor.lastName, 'Report', report.id);

      return responseMessage(true, 'Report declined successfully', [], report);
    } catch (error) {
      return responseMessage(false, "An error occured while declining report", [error.message]);
    }
  }

  async viewReport(id: string, actor: any): Promise<Report | ResponseMessage> {
    const report = await this.reportRepository.findOne({where: {id}});
    
    if (!report) {
      return responseMessage(false, 'Report not found');
    }

    await this.actionsService.createAction('View', actor.firstName, actor.lastName, 'Report', report.id);

    return responseMessage(true, 'Report found', [], report);
  }

  async performReportAction(reportId: string, action: string, actor: User): Promise<Report | ResponseMessage> {
    try {
      const report = await this.reportRepository.findOne({where: {id: reportId}});

      if (!report) {
        return responseMessage(false, 'Report not found');
      }

      switch (action) {
        case 'publish':
          return this.publishReport(reportId, actor);
        case 'delete':
          return this.deleteReport(reportId, actor);
        case 'decline':
          return this.declineReport(reportId, actor);
        case 'view':
          return this.viewReport(reportId, actor);
        default:
          return responseMessage(false, 'Invalid action');
      }
    } catch (error) {
      return responseMessage(false, "An error occured while performing report action", [error.message]);
    }
  }

  async getScoreCategory(id: string) {
    console
    const reports = await this.reportScoreRepository.findOne({where: {id}});
    
    if (!reports) {
      return responseMessage(false, 'Reports not found');
    }

    // console.log('reports total score', reports.totalScore);

    let score = reports.totalScore;

    if (score <= 40) {
      return "Red";
    } else if (score > 40 && score < 65) {
      return "Amber";
    } else if (score >= 65) {
      return "Green";
    }

    return reports;
  }

  async getRank() {
    const reportScore = await this.reportScoreRepository.find();
    
    if (!reportScore || reportScore.length === 0) {
      return responseMessage(false, 'Reports not found');
    }

    const sortedArray = reportScore.sort((a, b) => {
      if (a.totalScore !== b.totalScore) {
        return b.totalScore - a.totalScore;
      }

      return 0;
    });

    let currentPosition = 1;
    let previousValue = null;

    const arrayWithPosition = sortedArray.map((obj, index) => {
      if (previousValue !== null && previousValue !== obj.totalScore) {
        currentPosition = index + 1;
      }

      previousValue = obj.totalScore;

      return { ...obj, position: currentPosition };
    });
    
    return responseMessage(true, 'Reports found', [], arrayWithPosition);
  }

  async calculateScore(reportData: ReportDataInterface) {
    try {
      const state = await this.stateService.getStateByName(reportData.state);
      const {
        ictFund, percentageOfBudget, presenceOfIctProjects, 
        ictMinistry, stateIctPolicy, officialMailUse, 
        officialInternetProvision, officialInternetSpeed, videoConferenceUse, 
        intranetUse, ict4Learning, ict4HealthRecords, 
        presenceofTelemedicine, digitizedLandRecords, digitizedJudiciary, digitizedAgric, ecommerceIncentives, stateIctSystemDeploment, stateITDepartment, digitizedFiling, cyberSecurityInfra,
        startupDb, startupInvestmentVolume, startUpDirectJobs, 
        stateWebsiteFunctionality, stateWebsiteUI, stateWebsiteSecurity, 
        iCTUpskill, certifiedITPersonnel 
      } = reportData


      const stateBudgetAllocation = ictFund + percentageOfBudget + presenceOfIctProjects
      const govSystems = ictMinistry + stateIctPolicy + officialMailUse
      const internetAvailSpeed = officialInternetProvision + officialInternetSpeed + videoConferenceUse + intranetUse
      const levelIctReforms = ict4Learning + ict4HealthRecords + presenceofTelemedicine + digitizedLandRecords + digitizedJudiciary + digitizedAgric + ecommerceIncentives
      const deploymentCompSystems = stateIctSystemDeploment + stateITDepartment + digitizedFiling + cyberSecurityInfra
      const startUpEcosystem = startupDb + startupInvestmentVolume + startUpDirectJobs
      const statusStateWebsite = stateWebsiteFunctionality + stateWebsiteUI + stateWebsiteSecurity
      const staffIctProficiency = iCTUpskill + certifiedITPersonnel

      const totalScore = 
      stateBudgetAllocation + govSystems + 
      internetAvailSpeed + levelIctReforms + 
      deploymentCompSystems + startUpEcosystem + 
      statusStateWebsite + staffIctProficiency

      let reportResult = {
        stateId: state.id, stateBudgetAllocation, 
        govSystems, internetAvailSpeed, 
        levelIctReforms, deploymentCompSystems, 
        startUpEcosystem, statusStateWebsite, 
        staffIctProficiency, totalScore, 
        reportDataId: reportData.id
      }

      // console.log('reportResult', reportResult);

      await this.reportScoreRepository.save(reportResult);

      // console.log('reportScore', reportScore);
    } catch (error) {
      return responseMessage(false, "An error occured while calculating report score", [error.message]);
    }
  }

  async getReportsByStateId(id: string, actor: any) {
    const where: Partial<Report> = { id };
    const reports = await this.reportRepository.findOne({ where: { stateId: id } });
    
    if (!reports) {
      return responseMessage(false, 'Reports not found');
    }

    // await this.actionsService.createAction('View', actor.firstName, actor.lastName, 'Report', reports.id);

    return reports;
  }

  async getReportsByCreatedUser(id: string, actor: any) {
    const reports = await this.reportRepository.findOne({where: {createdById: id} });
    
    if (!reports) {
      return responseMessage(false, 'Reports not found');
    }

    // await this.actionsService.createAction('View', actor.firstName, actor.lastName, 'Report', reports.id);

    return reports;
  }

  async getReportsByPublishedUser(id: string, actor: any) {
    const reports = await this.reportRepository.findOne({where: {publishedById: id} });
    
    if (!reports) {
      return responseMessage(false, 'Reports not found');
    }

    // await this.actionsService.createAction('View', actor.firstName, actor.lastName, 'Report', reports.id);

    return reports;
  }

  async checkReportExistence(state: string): Promise<boolean | ResponseMessage> {
    const report = await this.reportDataRepository.findOne({where: {state: state}});
    
    if (!report) {
      return responseMessage(false, 'No report found for the selected state');
    }

    return responseMessage(true, 'Report exists for the selected state');
  }

  async getReportDataById(id: string) {
    const reportData = await this.reportDataRepository.findOne({where: {id}});
    
    if (!reportData) {
      return responseMessage(false, 'Report Data not found');
    }

    return reportData;
  }

  async getReportDataByState(state: string) {
    try {
      const reportData = await this.reportDataRepository.findOne({where: {state: state}});
      
      if (!reportData) {
        return responseMessage(false, 'Report Data not found');
      }

      return reportData;
    } catch (error) {
      return responseMessage(false, "An error occured while getting report data", [error.message]);
    }
  }

  async getAllReportData() {
    const reports = await this.reportDataRepository.find();
    
    if (!reports) {
      return responseMessage(false, 'Reports not found');
    }

    return reports;
  }

  async getAllReports() {
    const reports = await this.reportRepository.find();
    
    if (!reports) {
      return responseMessage(false, 'Reports not found');
    }

    return reports;
  }

  async getAllReportScore() {
    const reports = await this.reportScoreRepository.find();
    
    if (!reports) {
      return responseMessage(false, 'Reports not found');
    }

    return reports;
  }

  async updateReportData(id: string, updatedReportData: Partial<CreateReportDataDto>): Promise<ReportData | ResponseMessage> {
    try {
      const report = await this.reportRepository.findOne({ where: { reportDataId: id } });

      if (!report) {
        return responseMessage(false, 'Report Data not found');
      }

      const originalData = { ...report.reportData };
      // Object.assign(reportData, updatedReportData);

      // Object.keys(updatedReportData).forEach((key) => {
      //   if (updatedReportData[key] !== undefined) {
      //     report.reportData[key] = updatedReportData[key];
      //   }
      // });

      Object.keys(updatedReportData).forEach((key) => {
        if (updatedReportData[key] !== undefined) {
          // Check if the field is numeric and update it accordingly
          if (typeof updatedReportData[key] === 'string' && !isNaN(+updatedReportData[key])) {
            report.reportData[key] = parseInt(updatedReportData[key].toString(), 10);
          } else {
            report.reportData[key] = updatedReportData[key];
          }
        }
      });

      const result = await this.reportRepository.save(report);

      // console.log('Original Data:', originalData);
      // console.log('Updated Data:', result.reportData);

      // await this.calculateScore(result);

      // await this.actionsService.createAction('Edit', actor.firstName, actor.lastName, 'Report Data', reportData.id);

      return responseMessage(true, 'Report Data updated successfully', [], result.reportData);
    } catch (error) {
      return responseMessage(false, "An error occured while updating report data", [error.message]);
    }
  }
}
