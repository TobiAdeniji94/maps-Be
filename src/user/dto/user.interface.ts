import { IsString, IsEmail, IsEnum, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { Role } from '../enum/role.enum';


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class User {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'First name is too short' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Last name is too short' })
  lastName: string;

  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid Email' })
  email: string;

  @IsNotEmpty()
  @IsEnum(Role, { message: 'Please provide valid Role' })
  role: string;

  @IsNotEmpty()
  @Matches(passwordRegex, { message: `Password must contain minimum 8 and maximum 20 characters, 
    at least one uppercase letter,
    one lowercase letter,
    one number and one special character` })
  password: string;

  createdReports?: Report[];
  
  approvedReports?: Report[];

  refreshToken: string;

  accessToken: string;
}
