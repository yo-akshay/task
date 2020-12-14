import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import CONFIG from './commons/configs/config';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as compression from 'compression';
import { AllExceptionsFilter } from './commons/filters/allExceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = CONFIG();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.useGlobalFilters(new AllExceptionsFilter());

  app.use(compression());
  app.use(helmet());

  app.use(morgan('combined'));
  //TODO: there is a load balancer or reverse proxy. Express may need to be configured to trust the headers set by the proxy in order to get the correct IP for the end user
  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.enableCors();

  try {
    // quit on ctrl-c when running docker in terminal
    process.on('SIGINT', () => {
      console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
      app.close();
    });

    // quit properly on docker stop
    process.on('SIGTERM', () => {
      console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
      app.close();
    });
  } catch (e) {
    console.error(e);
  }
  await app.listen(config.port);
}
bootstrap();
