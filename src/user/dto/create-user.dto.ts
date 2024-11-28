import { IsString, IsEmail, IsEnum, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { Role } from '../enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'First name is too short' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Last name is too short' })
  lastName: string;

  @ApiProperty({ example: 'abcdegh12345678@yahoo.com' })
  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid Email' })
  email: string;

  @ApiProperty({ example: 'Admin || Reporter || Viewer' })
  @IsNotEmpty()
  @IsEnum(Role, { message: 'Please provide valid Role' })
  role: string;

  @ApiProperty({ example: 'Admin@123' })
  @IsNotEmpty()
  @Matches(passwordRegex, { message: `Password must contain minimum 8 and maximum 20 characters, 
    at least one uppercase letter,
    one lowercase letter,
    one number and one special character` })
  password: string;

  refreshToken: string;
  accessToken: string;
}
