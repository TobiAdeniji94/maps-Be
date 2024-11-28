import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'abcdegh12345678@yahoo.com' })
    email: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'Admin@123' })
    password: string;
}
