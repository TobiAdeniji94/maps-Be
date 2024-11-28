import { ApiProperty } from "@nestjs/swagger";
export class CreateReportDataDto {
    id: string;

    @ApiProperty({type: Number, example: 10 })
    ictFund: number;

    @ApiProperty({type: Number, example: 5 })
    percentageOfBudget: number;

    @ApiProperty({type: Number, example: 3 })
    presenceOfIctProjects: number;

    @ApiProperty({type: Number, example: 8 })
    ictMinistry: number;

    @ApiProperty({type: Number, example: 6 })
    stateIctPolicy: number;

    @ApiProperty({type: Number, example: 4 })
    officialMailUse: number;

    @ApiProperty({type: Number, example: 3 })
    officialInternetProvision: number;

    @ApiProperty({type: Number, example: 2 })
    officialInternetSpeed: number;

    @ApiProperty({type: Number, example: 1 })
    videoConferenceUse: number;

    @ApiProperty({type: Number, example: 0 })
    intranetUse: number;

    @ApiProperty({type: Number, example: 2 })
    ict4Learning: number;

    @ApiProperty({type: Number, example: 0 })
    ict4HealthRecords: number;

    @ApiProperty({type: Number, example: 1 })
    presenceofTelemedicine: number;

    @ApiProperty({type: Number, example: 2 })
    digitizedLandRecords: number;

    @ApiProperty({type: Number, example: 2 })
    digitizedJudiciary: number;

    @ApiProperty({type: Number, example: 2 })
    digitizedAgric: number;

    @ApiProperty({type: Number, example: 0 })
    ecommerceIncentives: number;

    @ApiProperty({type: Number, example: 0 })
    stateIctSystemDeploment: number;

    @ApiProperty({type: Number, example: 2 })
    stateITDepartment: number;

    @ApiProperty({type: Number, example: 3 })
    digitizedFiling: number;

    @ApiProperty({type: Number, example: 2 })
    cyberSecurityInfra: number;

    @ApiProperty({type: Number, example: 2 })
    startupDb: number;

    @ApiProperty({type: Number, example: 2 })
    startupInvestmentVolume: number;

    @ApiProperty({type: Number, example: 2 })
    startUpDirectJobs: number;

    @ApiProperty({type: Number, example: 2 })
    stateWebsiteFunctionality: number;

    @ApiProperty({type: Number, example: 0 })
    stateWebsiteUI: number;

    @ApiProperty({type: Number, example: 1 })
    stateWebsiteSecurity: number;

    @ApiProperty({type: Number, example: 2 })
    iCTUpskill: number;

    @ApiProperty({type: Number, example: 2 })
    certifiedITPersonnel: number;

    @ApiProperty({type: Number, example: "Lagos" })
    state: string;

    // constructor(
    //     ictFund: number,
    //     percentageOfBudget: number,
    //     presenceOfIctProjects: number,
    //     ictMinistry: number,
    //     stateIctPolicy: number,
    //     officialMailUse: number,
    //     officialInternetProvision: number,
    //     officialInternetSpeed: number,
    //     videoConferenceUse: number,
    //     intranetUse: number,
    //     ict4Learning: number,
    //     ict4HealthRecords: number,
    //     presenceofTelemedicine: number,
    //     digitizedLandRecords: number,
    //     digitizedJudiciary: number,
    //     digitizedAgric: number,
    //     ecommerceIncentives: number,
    //     stateIctSystemDeploment: number,
    //     stateITDepartment: number,
    //     digitizedFiling: number,
    //     cyberSecurityInfra: number,
    //     startupDb: number,
    //     startupInvestmentVolume: number,
    //     startUpDirectJobs: number,
    //     stateWebsiteFunctionality: number,
    //     stateWebsiteUI: number,
    //     stateWebsiteSecurity: number,
    //     iCTUpskill: number,
    //     certifiedITPersonnel: number,
    //     state: string
    // ){
    //     this.ictFund = ictFund;
    //     this.percentageOfBudget = percentageOfBudget;
    //     this.presenceOfIctProjects = presenceOfIctProjects;
    //     this.ictMinistry = ictMinistry;
    //     this.stateIctPolicy = stateIctPolicy;
    //     this.officialMailUse = officialMailUse;
    //     this.officialInternetProvision = officialInternetProvision;
    //     this.officialInternetSpeed = officialInternetSpeed;
    //     this.videoConferenceUse = videoConferenceUse;
    //     this.intranetUse = intranetUse;
    //     this.ict4Learning = ict4Learning;
    //     this.ict4HealthRecords = ict4HealthRecords;
    //     this.presenceofTelemedicine = presenceofTelemedicine;
    //     this.digitizedLandRecords = digitizedLandRecords;
    //     this.digitizedJudiciary = digitizedJudiciary;
    //     this.digitizedAgric = digitizedAgric;
    //     this.ecommerceIncentives = ecommerceIncentives;
    //     this.stateIctSystemDeploment = stateIctSystemDeploment;
    //     this.stateITDepartment = stateITDepartment;
    //     this.digitizedFiling = digitizedFiling;
    //     this.cyberSecurityInfra = cyberSecurityInfra;
    //     this.startupDb = startupDb;
    //     this.startupInvestmentVolume = startupInvestmentVolume;
    //     this.startUpDirectJobs = startUpDirectJobs;
    //     this.stateWebsiteFunctionality = stateWebsiteFunctionality;
    //     this.stateWebsiteUI = stateWebsiteUI;
    //     this.stateWebsiteSecurity = stateWebsiteSecurity;
    //     this.iCTUpskill = iCTUpskill;
    //     this.certifiedITPersonnel = certifiedITPersonnel;
    //     this.state = state;
    // }
}
