import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResponseMessage, responseMessage } from '../utils/response-message';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,

    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,  
  ) {}

  public async
  async signUp(createUserDto: CreateUserDto) {
    const userExists = await this.userService.findbyEmail(createUserDto.email);

    if (userExists) {
      return responseMessage(false, 'Email already in use');
    } 
    
    const hash = await this.hashPassword(createUserDto.password);
    const newUser = await this.userService.create({ ...createUserDto, password: hash,});
    // console.log(newUser);
    
    return responseMessage(true, 'User created successfully', [], newUser);

    // const tokens = await this.getTokens(newUser.id, newUser.email);
    // await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    // return tokens;
  }

  async signIn(authDto: AuthDto) {
    const user = await this.userService.findbyEmail(authDto.email);
    
    if (!user) {
      return responseMessage(false, 'User does not exist');
    }
    
    // console.log('sigin user', user);
    
    const passwordMatches = await this.validatePassword(authDto.password, user.password);
    if (!passwordMatches) {
      return responseMessage(false, 'Password is incorrect');
    }

    await this.userRepository.update(user.id, { lastLogin: new Date() });

    const tokens = await this.getTokens(user.id, user.firstName, user.lastName, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    // await this.updateAccessToken(user.id, tokens.accessToken);

    return responseMessage(true, 'User signed in successfully', [], {user, tokens});

  }

  async signOut(userId: string) {
    await this.userService.update(userId, { refreshToken: null });
    return responseMessage(true, 'User signed out successfully');
  }

  hashPassword(data: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(data, salt);
  }

  validatePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshToken) {
      return responseMessage(false, 'User does not exist. Please sign up');
    }

    const refreshTokenMatches = await this.validatePassword(refreshToken, user.refreshToken);
    if (!refreshTokenMatches) {
      return responseMessage(false, 'Refresh token is incorrect. Access denied');
    }

    const tokens = await this.getTokens(user.id, user.firstName, user.lastName, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async updateAccessToken(userId: string, accessToken: string) {
    const hashedAccessToken = await this.hashPassword(accessToken);
    await this.userService.update(userId, { accessToken: hashedAccessToken });
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashPassword(refreshToken);
    await this.userService.update(userId, { refreshToken: hashedRefreshToken });
  }

  async getTokens(userId: string, firstName: string, lastName: string, email: string, role: string) {
    const payload = { sub: userId, firstName, lastName, email, role };
    // console.log('payload', payload);
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      }),

      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
