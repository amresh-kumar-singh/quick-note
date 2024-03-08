import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseExceptionFilter } from './filters/mongo-error.filters';
import serverlessExpress from '@codegenie/serverless-express';

let server;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new MongooseExceptionFilter());

  // await app.listen(process.env.PORT || 8000);
  await app.init();
  const epxressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: epxressApp });
}
// bootstrap();

export const handler = async (event, context, callback) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
