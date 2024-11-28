import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { AccessTokenGuard } from '../utils/guards/access-token.guard';
import { Roles } from '../utils/decorator/role.decorator';
import { Role } from '../user/enum/role.enum';
import { RolesGuard } from '../utils/guards/roles.guard';
import { UnauthorizedExceptionFilter } from '../utils/exception-filter/unauthorized-exception.filter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';


@ApiTags('state')
@ApiBearerAuth()
@Controller('state')
@UseFilters(UnauthorizedExceptionFilter)
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  create(@Body() createStateDto: CreateStateDto) {
    return this.stateService.createState(createStateDto);
  }

  @Get()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  getStates() {
    return this.stateService.getStates();
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  getStateById(@Param('id') id: string) {
    return this.stateService.getStateById(id);
  }

  @Get('json/nigeria.geojson')
  async nigeriaStates(@Res() res: Response): Promise<void> {
    try {
      const result = JSON.parse(fs.readFileSync('src/utils/nigeria.geojson', 'utf8'))

      res.setHeader('Content-Type', 'application/geo+json');
      
      res.json((result));
    } catch (error) {
      res.status(500).json({error: 'Internal server error'});
    }
  }

  @Get('json/stateBudgetAllocation')
  // @UseGuards(AccessTokenGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Reporter)
  async stateBudgetAllocationJson(@Res() res: Response): Promise<void> {
    try {
      const result = JSON.parse(fs.readFileSync('src/utils/stateBudgetAllocation.json', 'utf8'))
      res.json(result);
    } catch (error) {
      res.status(500).json({error: 'Internal server error'});
    }
  }
  
  @Get('json/govSystems')
  // @UseGuards(AccessTokenGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Reporter)
  async govSystemsJson(@Res() res: Response): Promise<void> {
    try {
      const result = JSON.parse(fs.readFileSync('src/utils/govSystems.json', 'utf8'))
      res.json(result);
    } catch (error) {
      res.status(500).json({error: 'Internal server error'});
    }
  }

  @Get('json/internetAvailSpeed')
  // @UseGuards(AccessTokenGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Reporter)
  async internetAvailSpeedJson(@Res() res: Response): Promise<void> {
    try {
      const result = JSON.parse(fs.readFileSync('src/utils/internetAvailSpeed.json', 'utf8'))
      res.json(result);
    } catch (error) {
      res.status(500).json({error: 'Internal server error'});
    }
  }

  @Get('json/levelIctReforms')
  // @UseGuards(AccessTokenGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Reporter)
  async levelIctReformsJson(@Res() res: Response): Promise<void> {
    try {
      const result = JSON.parse(fs.readFileSync('src/utils/levelIctReforms.json', 'utf8'))
      res.json(result);
    } catch (error) {
      res.status(500).json({error: 'Internal server error'});
    }
  }

  @Get('json/deploymentCompSystems')
  // @UseGuards(AccessTokenGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Reporter)
  async deploymentCompSystemsJson(@Res() res: Response): Promise<void> {
    try {
      const result = JSON.parse(fs.readFileSync('src/utils/deploymentCompSystems.json', 'utf8'))
      res.json(result);
    } catch (error) {
      res.status(500).json({error: 'Internal server error'});
    }
  }

  @Get('json/startUpEcosystem')
  // @UseGuards(AccessTokenGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Reporter)
  async startUpEcosystemJson(@Res() res: Response): Promise<void> {
    try {
      const result = JSON.parse(fs.readFileSync('src/utils/startUpEcosystem.json', 'utf8'))
      res.json(result);
    } catch (error) {
      res.status(500).json({error: 'Internal server error'});
    }
  }

  @Get('json/statusStateWebsite')
  // @UseGuards(AccessTokenGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Reporter)
  async statusStateWebsiteJson(@Res() res: Response): Promise<void> {
    try {
      const result = JSON.parse(fs.readFileSync('src/utils/statusStateWebsite.json', 'utf8'))
      res.json(result);
    } catch (error) {
      res.status(500).json({error: 'Internal server error'});
    }
  }

  @Get('json/staffIctProficiency')
  // @UseGuards(AccessTokenGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Reporter)
  async staffIctProficiencyJson(@Res() res: Response): Promise<void> {
    try {
      const result = JSON.parse(fs.readFileSync('src/utils/staffIctProficiency.json', 'utf8'))
      res.json(result);
    } catch (error) {
      res.status(500).json({error: 'Internal server error'});
    }
  }

  @Get('json/totalScore')
  // @UseGuards(AccessTokenGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Reporter)
  async totalScoreJson(@Res() res: Response): Promise<void> {
    try {
      const result = JSON.parse(fs.readFileSync('src/utils/totalScore.json', 'utf8'))
      res.json(result);
    } catch (error) {
      res.status(500).json({error: 'Internal server error'});
    }
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  updateState(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
    return this.stateService.updateState(id, updateStateDto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  deleteState(@Param('id') id: string) {
    return this.stateService.deleteState(id);
  }
}
