import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(3, {
    message: 'Password must be at least 3 character long.',
  })
  password: string;
}
