import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongooseError } from 'mongoose';

@Catch(MongooseError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse();

    const responseMessageg = (type, message) => {
      res.status(404).json({
        message,
        type,
      });
    };

    switch (exception.code || exception.kind) {
      case 11000:
        responseMessageg('Duplicate', 'Data already in use!');
        break;
      case 'ObjectId':
        responseMessageg('Invalid', 'Invalid data provided!');
        break;
      default:
        responseMessageg('DB', 'Some error occured!');
    }
  }
}
