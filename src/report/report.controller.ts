import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { CreateReportDataDto } from './dto/create-report-data.dto';
import { UpdateReportDataDto } from './dto/update-report-data.dto';
import { ReportActionDto } from './dto/report-action.dto';
import { AccessTokenGuard } from '../utils/guards/access-token.guard';
import { Roles } from '../utils/decorator/role.decorator';
import { Role } from '../user/enum/role.enum';
import { RolesGuard } from '../utils/guards/roles.guard';
import { UnauthorizedExceptionFilter } from '../utils/exception-filter/unauthorized-exception.filter';
import { User } from '../user/entities/user.entity';
import { GetUser } from '../utils/decorator/getUser.decorator';
import { UserDetail } from '../report/dto/userDetail.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('report')
@ApiBearerAuth()
@Controller('report')
@UseFilters(UnauthorizedExceptionFilter)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  // @Post('create-report')
  // @UseGuards(AccessTokenGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Reporter)
  // createReport(@Body() createReportDto: CreateReportDto) {
  //   return this.reportService.createReport(createReportDto);
  // }

  @Post('create-report-data')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  createReportData(@Body() createReportData: CreateReportDataDto, @GetUser() user: UserDetail) {
    console.log("Create Report Data user", user);
    
    return this.reportService.createReportData2(createReportData, user);
  }

  // @Post('create-temp-report-data')
  // @UseGuards(AccessTokenGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Reporter)
  // createTempReportData(@Body() createReportData: CreateReportDataDto, @GetUser() user: UserDetail) {
  //   return this.reportService.createTempReportData(createReportData, user);
  // }

  @Post('save')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  saveReport(@Body() createReportData: CreateReportDataDto, @GetUser() user: UserDetail) {
    return this.reportService.createOrUpdateReportData(createReportData, user);
  }

  @Post('submit-report-data')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  submitReportData(@Body() createReportData: CreateReportDataDto, @GetUser() user: UserDetail) {
    return this.reportService.submitReportData(createReportData, user);
  }


  @Get('get-reports')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  getAllReports() {
    return this.reportService.getAllReports();
  }

  @Get('get-report-data')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  getAllReportData() {
    return this.reportService.getAllReportData();
  }

  @Get('get-report-score')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  getAllReportScore() {
    return this.reportService.getAllReportScore();
  }

  // @Get('get-report-by-id/:id')
  // @UseGuards(AccessTokenGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Reporter)
  // getReportById(@Param('id') id: string) {
  //   return this.reportService.getReportById(id);
  // }

  @Get('report-existence/:state')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  checkReportExistence(@Param('state') state: string) {
    return this.reportService.checkReportExistence(state);
  }

  @Get('get-report-by-state/:id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  getReportsByStateId(@Param('id') id: string, @GetUser() user: User) {
    return this.reportService.getReportsByStateId(id, user);
  }

  @Get('get-report-published-user/:id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  getReportsByPublishedUser(@Param('id') id: string, @GetUser() user: User) {
    return this.reportService.getReportsByPublishedUser(id, user);
  }

  @Get('get-report-created-user/:id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  getReportsByCreatedUser(@Param('id') id: string, @GetUser() user: User) {
    return this.reportService.getReportsByCreatedUser(id, user);
  }

  @Get('get-report-data-by-id/:id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  getReportDataById(@Param('id') id: string) {
    return this.reportService.getReportDataById(id);
  }
  
  @Get('get-report-data-by-state/:state')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  getReportDataByState(@Param('state') state: string) {
    return this.reportService.getReportDataByState(state);
  }

  // @Patch(':id')
  // @UseGuards(AccessTokenGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Reporter)
  // updateReport(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
  //   return this.reportService.updateReport(id, updateReportDto);
  // }

  @Patch('update-report-data/:id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  updateReportData(@Param('id') id: string, @Body() updatedReportData: UpdateReportDataDto) {
    return this.reportService.updateReportData(id, updatedReportData);
  }

  // @Delete(':id')
  // @UseGuards(AccessTokenGuard, RolesGuard)
  // @Roles(Role.Admin)
  // deleteReport(@Param('id') id: string, @GetUser() user: UserDetail) {
  //   return this.reportService.deleteReport(id, user);
  // }

  @Delete('delete-report-data/:id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin)
  deleteReportData(@Param('id') id: string) {
    return this.reportService.deleteReportData(id);
  }

  @Delete('delete-report-score/:id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin)
  deleteReportScore(@Param('id') id: string) {
    return this.reportService.deleteReportScore(id);
  }

  @Post('/actions/:id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin)
  performReportAction(@Param('id') id: string, @GetUser() user: User, @Body() actionPayload: ReportActionDto) {
    const { action } = actionPayload;
    // console.log("PERFORM ACTION", action);
    // console.log("PERFORM USER",user);
    // console.log("PERFROM ID",id);
    
    return this.reportService.performReportAction(id, action, user);
  }
  @Get('score-category/:id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  getScoreCategory(@Param('id') id: string) {
    return this.reportService.getScoreCategory(id);
  }

  @Get('rank')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  getRank() {
    return this.reportService.getRank();
  }
}
