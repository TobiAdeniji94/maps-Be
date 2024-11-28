import { Controller, Post, Body, Req, UseGuards, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { Request, response } from 'express';
import { AccessTokenGuard } from '../utils/guards/access-token.guard';
import { RefreshTokenGuard } from '../utils/guards/refresh-token.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { responseMessage } from 'src/utils/response-message';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signin(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

  // @UseGuards(AccessTokenGuard)
  // @Post('signout')
  // signout(@Req() req: Request) {
  //   try {
  //     this.authService.signOut(req.user['sub']);
  //   return responseMessage(true, 'User signed out successfully');
  //   } catch (error) {
  //     return responseMessage(false, 'Something went wrong', [error.message]);
  //   }

  // }

  // @UseGuards(RefreshTokenGuard)
  // @Post('refresh')
  // refreshTokens(@Req() req: Request) {
  //   const userId = req.user['sub'];
  //   const refreshToken = req.user['refreshToken'];
  //   return this.authService.refreshTokens(userId, refreshToken);
  // }
}
