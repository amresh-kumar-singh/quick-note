import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(NoFilesInterceptor())
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const user: CreateUserDto = await this.authService.register(createUserDto);
    return this.authService.formattedUserResponse(user);
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginUserDto: LoginUserDto) {
    const user = await this.authService.login(loginUserDto);
    return this.authService.formattedUserResponse(user);
  }
}
