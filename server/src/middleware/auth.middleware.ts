import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UserDocument, UserEntity } from 'src/auth/entities/auth.entity';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

export interface ExpressRequest extends Request {
  user?: UserDocument;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    // private readonly configService: ConfigService,
  ) {}
  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    // Checking if req header has authorization token if not setting user to null
    if (!req.headers['authorization']) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers['authorization'].split(' ')[1];
    try {
      const decode = verify(token, 'JWT_SECRET');
      const user = await this.authService.findUserByEmail(decode.email);
      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
