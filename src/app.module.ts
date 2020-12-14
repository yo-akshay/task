import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { CommonsModule } from './commons/commons.module';
import config from './commons/configs/config';
import { AuthenticationMiddleware } from './commons/middlewares/authenticate.middleware';

@Module({
  imports: [ApiModule,
    ConfigModule.forRoot({
      load: [config],
    }),
    CommonsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({
        path: '*', method: RequestMethod.ALL
      });
  }
}