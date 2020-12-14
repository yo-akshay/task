import { Module } from '@nestjs/common';
import { CommonsModule } from '../../commons/commons.module';
import { TaskController } from './task.controller';


@Module({
  imports: [CommonsModule],
  controllers: [TaskController]
})
export class TaskModule {}