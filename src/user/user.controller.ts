import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenerateUserDto } from './dto/generate-user.dto';
import { AccessTokenGuard } from '../utils/guards/access-token.guard';
import { Roles } from '../utils/decorator/role.decorator';
import { Role } from './enum/role.enum';
import { RolesGuard } from 'src/utils/guards/roles.guard';
import { UnauthorizedExceptionFilter } from '../utils/exception-filter/unauthorized-exception.filter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
@UseFilters(UnauthorizedExceptionFilter)
export class UserController {
  constructor(
    private readonly userService: UserService,
    ) {}
  @Post('generate-user')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin)
  generateUser(@Body() generateUserDto: GenerateUserDto) {
    return this.userService.generateUser(generateUserDto);
  }

  // @Get('get-user-by-email/:email')
  // @UseGuards(AccessTokenGuard, RolesGuard)
  // @Roles(Role.Admin)
  // findbyEmail(@Param('email') email: string) {
  //   return this.userService.findbyEmail(email);
  // }

  @Get('get-users')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch('update-profile/:id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin, Role.Reporter)
  updateProfile(@Param('id') id: string, @Body() updatedProfile: Partial<User>) {
    return this.userService.updateUserProfile(id, updatedProfile);
  }


  @Delete(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
