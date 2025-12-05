// src/modules/auth/dto/register.dto.ts
import { IsEmail, IsIn, IsNotEmpty, IsOptional, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/schemas/users.shema';
import { UserRole } from 'src/users/schemas/users.shema';

export class RegisterDto {
@ApiProperty()
  @IsNotEmpty({ message: 'Username is required' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'Username must be alphanumeric without spaces or special characters',
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, {
    message: 'Password must contain at least one special character',
  })
  password: string;

  @IsOptional()
  role?:'user' | 'admin';

}
