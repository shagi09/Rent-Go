import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from 'src/auth/dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
    private authService: AuthService){}

    @Post('signup')
    async signup(@Body() dto:RegisterDto){
      return this.authService.signup(dto);

    } 

    @Post('login')
    async login(@Body() dto:LoginDto){
      return this.authService.login(dto);
    }
}
