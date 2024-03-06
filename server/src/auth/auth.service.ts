import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserEntity } from './entities/auth.entity';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const isUserExists = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (isUserExists) throw new NotFoundException('Email already exists!');
    const user = new this.userModel(createUserDto);

    return user.save();
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel
      .findOne({ email: loginUserDto.email })
      .select('+password');

    if (!user) throw new NotFoundException('User not found!');

    const isPasswordValid = await compare(loginUserDto.password, user.password);
    if (!isPasswordValid)
      throw new HttpException('Invalid password!', HttpStatus.NOT_FOUND);
    return user;
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email }).select('-password');
    return user;
  }

  formattedUserResponse(userEntity: UserEntity) {
    return {
      username: userEntity.username,
      email: userEntity.email,
      token: this.generateJWT(userEntity),
    };
  }

  generateJWT(userEntity: UserEntity) {
    return sign(
      { email: userEntity.email },
      this.configService.get('JWT_SECRET'),
    );
  }
}
