import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseExceptionFilter } from './filters/mongo-error.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new MongooseExceptionFilter());

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
