import { Post, Body } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
//import { LoginDto } from 'src/users/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

async signup(dto: RegisterDto) {
  const existing = await this.usersService.findByEmail(dto.email);
  if (existing) {
    throw new UnauthorizedException('User already exists');
  }
  const existingUsername = await this.usersService.findByUsername(dto.username)
  if (existingUsername) {
    throw new UnauthorizedException('Username already exists');
  }

  const hash = await bcrypt.hash(dto.password, 10);

  const user = await this.usersService.create({
    email: dto.email,
    username: dto.username,
    password: hash,
    role: dto.role || 'user',
  });

  console.log('User created:', user);

  return this.signPayload(user);
}

signPayload(user: any) {
  const payload = { sub: user._id.toString(), email: user.email,role: user.role };
  const accessToken = this.jwtService.sign(payload);

  return {
    accessToken,
    user: {
      id: payload.sub,
      email: user.email,
      username: user.username,
      role: user.role
    },
  };
}


  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !user.password) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return this.signPayload(user);
  }



}
